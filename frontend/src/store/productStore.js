import axios from "axios";
import { create } from "zustand";

const productStore = create((set) => ({
  product: null,
  productList: [],
  isLoading: false,
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
    } catch (error) {
      set({ product: null, isFetching: false });
      return null;
    }
  },
}));

export default productStore;
