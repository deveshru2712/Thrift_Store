import { create } from "zustand";
import axios from "axios";

const authStore = create((set, get) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isAuthChecking: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
    } catch (error) {
      set({ user: null, isSigningUp: false });
      return null;
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
    } catch (error) {
      set({ user: null, isLoggingIn: false });
      return null;
    }
  },

  authCheck: async () => {
    set({ isAuthChecking: true });
    try {
      const response = await axios.get("/api/auth/me");
      set({ user: response.data.user, isAuthChecking: false });
    } catch (error) {
      set({ isAuthChecking: false, user: null });
      return null;
    }
  },
}));

export default authStore;
