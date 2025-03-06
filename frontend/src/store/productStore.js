import axios from "axios";
import { create } from "zustand";

const productStore = create((set) => ({
  isFetching: false,
  productList: [],
  getProducts: async () => {
    set({ isFetching: true });
    try {
      const response = await axios(`/api/product/`);
      set({ productList: response.data.productList, isFetching: false });
      console.log(response.data);
    } catch (error) {
      set({ productStore: [], isFetching: false });
    }
  },
}));

export default productStore;
