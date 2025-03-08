import { create } from "zustand";
import axios from "axios";

const authStore = create((set, get) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isAuthChecking: false,
  isCartUpdating: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      console.log("success");
    } catch (error) {
      set({ user: null, isSigningUp: false });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      console.log("success");
    } catch (error) {
      set({ user: null, isLoggingIn: false });
    }
  },

  authCheck: async () => {
    set({ isAuthChecking: true });
    try {
      const response = await axios.get("/api/auth/me");
      set({ user: response.data.user, isAuthChecking: false });
      console.log(response.data.user);
      // return response.data.user;
    } catch (error) {
      set({ isAuthChecking: false, user: null });
      return null;
    }
  },
  updateCart: async (id) => {
    set({ isCartUpdating: true });
    try {
      //updating the cart
      const cartResponse = await axios.post(`/api/product/cart/update/${id}`);
      //fetching for the user state
      const userResponse = await axios.get("/api/auth/me");

      //updating for the user state
      set({
        user: userResponse.data.user,
        isCartUpdating: false,
      });

      // return userResponse.data.user;
    } catch (error) {
      set({ isCartUpdating: false });
      console.error("Cart update failed:", error);
      return null;
    }
  },

  // Add a dedicated method to refresh cart data if needed elsewhere
  // refreshUserData: async () => {
  //   try {
  //     const response = await axios("/api/auth/me");
  //     set({ user: response.data.user });
  //     return response.data.user;
  //   } catch (error) {
  //     console.error("Failed to refresh user data:", error);
  //     return null;
  //   }
  // },
}));

export default authStore;
