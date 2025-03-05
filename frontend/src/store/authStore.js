import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
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
}));

export default authStore;
