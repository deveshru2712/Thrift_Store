import axios from "axios";
import { create } from "zustand";

const productStore = create((set) => ({
  isFetching: false,
  product: null,
  cart: null,
  productList: [],
  getProducts: async () => {
    set({ isFetching: true });
    try {
      const response = await axios.get(`/api/product/`);
      set({ productList: response.data.productList, isFetching: false });
    } catch (error) {
      set({ productList: [], isFetching: false });
      return null;
    }
  },
  getProductById: async (id) => {
    set({ isFetching: true });
    try {
      const response = await axios.get(`/api/product/${id}`);
      const product = response.data.product;
      set({ product, isFetching: false });

      // console.log(response.data.product);
      return product;
    } catch (error) {
      set({ product: null, isFetching: false });
      return null;
    }
  },
  fetchCart: async () => {
    set({ isFetching: true });
    try {
      const response = await axios.get("/api/cart");
      console.log(response.data.cart);
      set({ cart: response.data.cart, isFetching: false });
      // return
    } catch (error) {
      set({ cart: null, isFetching: false });
    }
  },
}));

export default productStore;
