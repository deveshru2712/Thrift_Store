import axios from "axios";
import { create } from "zustand";

const productStore = create((set) => ({
  product: null,
  list: [],
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
  searchProduct: async (title) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`/api/product/search/${title}`);
      set({ list: response.data.list, isLoading: false });
      console.log(response.data.list);
      return response.data.list;
    } catch (error) {
      set({ list: [], isLoading: false });
      return null;
    }
  },
}));

export default productStore;
