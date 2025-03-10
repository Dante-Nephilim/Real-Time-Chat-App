import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { RegisterFormData } from "../pages/RegisterPage";
import { LoginFormData } from "../pages/LoginPage";
import { User } from "../types/user";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
interface AuthState {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  socket: any;
  checkAuth: () => Promise<void>;
  signUp: (data: RegisterFormData) => Promise<void>;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfilePic: (data: { profilePic: string }) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}
const baseURL = "http://localhost:5000";

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data.data });
    } catch (error) {
      set({ authUser: null });
      get().connectSocket();
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data: RegisterFormData) => {
    try {
      set({ isSigningUp: true });
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };
      const response = await axiosInstance.post("/auth/register", userData);
      set({ authUser: response.data.data });
      get().connectSocket();
    } catch (error) {
      console.error(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginFormData) => {
    try {
      set({ isLoggingIn: true });
      const userData = {
        email: data.email,
        password: data.password,
      };
      const response = await axiosInstance.post("/auth/login", userData);
      set({ authUser: response.data.data });
      get().connectSocket();
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfilePic: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile-picture", data);
      set({ authUser: response.data.data });
      toast.success("Profile Picture Updated Successfully");
    } catch (error) {
      console.error(error);
      toast.error("something went wrong.");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(baseURL);
    socket.connect();
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
