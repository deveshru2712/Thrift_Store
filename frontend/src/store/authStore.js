import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isAuthChecking: false,
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
      const response = await axios("/api/auth/me");
      set({ user: response.data.user, isAuthChecking: false });
      console.log(response.data.user);
    } catch (error) {
      set({ isAuthChecking: false, user: null });
    }
  },
  updateCart: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/api/product/cart/${id}`);
      authCheck();
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));

export default authStore;
