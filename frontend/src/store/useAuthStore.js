import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import axios from "axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const user = await axiosInstance.post("auth/login", data);
      set({ authUser: user.data });
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      console.log("Before Api Request");
      const res = await axiosInstance.put("auth/update-profile", data);
      console.log("After Api Request");

      set({ authUser: res.data });
      toast.success("Profile uploaded successfully");
    } catch (error) {
      console.log("error in update profile: ", error);
      toast.error("Was not uploaded", error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
