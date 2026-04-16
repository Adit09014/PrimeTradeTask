import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: false,
  isCheckingAuth: true,

  // 🔐 Check Auth (cookie-based)
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/profile", {
        withCredentials: true,
      });

      set({ authUser: res.data.user });
    } catch (err) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // 🔑 Login
  login: async (data) => {
    try {
        set({ isLoading: true });

        await axiosInstance.post("/auth/login", data, {
        withCredentials: true,
        });

        // 🔥 Immediately fetch user after login
        const res = await axiosInstance.get("/auth/profile", {
        withCredentials: true,
        });

        set({ authUser: res.data.user });

    } catch (err) {
        console.error(err.response?.data?.message);
    } finally {
        set({ isLoading: false });
    }
    },

  // 📝 Signup
  signup: async (data) => {
    try {
        set({ isLoading: true });

        await axiosInstance.post("/auth/signup", data, {
        withCredentials: true,
        });

        // 🔥 Immediately fetch profile (BEST)
        const res = await axiosInstance.get("/auth/profile", {
        withCredentials: true,
        });

        set({ authUser: res.data.user });

    } catch (err) {
        console.error("Signup failed:", err.response?.data?.message);
    } finally {
        set({ isLoading: false });
    }
},

  // 🚪 Logout
  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout", {}, {
        withCredentials: true,
      });

      set({ authUser: null });
    } catch (err) {
      console.error("Logout failed:", err.response?.data?.message);
    }
  },
}));