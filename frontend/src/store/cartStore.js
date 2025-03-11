import axios from "axios";
import { create } from "zustand";

const cartStore = create((set) => ({
  cart: null,
  isFetching: false,
  isCartUpdating: false,
  addCart: async (id) => {
    set({ isCartUpdating: true });
    try {
      //updating the cart
      const cartResponse = await axios.post(`/api/cart/add/${id}`);
      //fetching for the user state
      const userResponse = await axios.get("/api/auth/me");

      set({
        user: userResponse.data.user,
        isCartUpdating: false,
      });
    } catch (error) {
      set({ isCartUpdating: false });
      console.error("Cart update failed:", error);
      return null;
    }
  },
  fetchCart: async () => {
    set({ isFetching: true });
    try {
      const response = await axios.get("/api/cart");
      set({ cart: response.data.cart, isFetching: false });
      return response.data.cart;
    } catch (error) {
      set({ cart: null, isFetching: false });
      return null;
    }
  },
  updateQuantity: async (method, id) => {
    set({ isCartUpdating: true });
    try {
      const response = await axios.post(`/api/cart/${method}/${id}`);
      set({ cart: response.data.cart, isCartUpdating: false });
    } catch (error) {
      set({ isCartUpdating: false });
      return null;
    }
  },
  deleteFromCart: async (id) => {
    set({ isCartUpdating: true });
    try {
      const response = await axios.post(`/api/cart/remove/${id}`);
      set({ cart: response.data.cart, isCartUpdating: false });
    } catch (error) {
      set({ isCartUpdating: false });
      return null;
    }
  },
}));

export default cartStore;
