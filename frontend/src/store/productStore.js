import axios from "axios";
import { create } from "zustand";

const productStore = create((set) => ({
  isFetching: false,
  product: null,
  productList: [],
  getProducts: async () => {
    set({ isFetching: true });
    try {
      const response = await axios(`/api/product/`);
      set({ productList: response.data.productList, isFetching: false });
    } catch (error) {
      set({ productList: [], isFetching: false });
      return null;
    }
  },
  getProductById: async (id) => {
    set({ isFetching: true });
    try {
      const response = await axios(`/api/product/${id}`);
      const product = response.data.product;
      set({ product, isFetching: false });

      // console.log(response.data.product);
      return product;
    } catch (error) {
      set({ product: null, isFetching: false });
      return null;
    }
  },
}));

export default productStore;
