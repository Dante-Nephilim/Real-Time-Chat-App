import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { RegisterFormData } from "../pages/RegisterPage";
import { LoginFormData } from "../pages/LoginPage";
import { User } from "../types/user";
interface AuthState {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signUp: (data: RegisterFormData) => Promise<void>;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data.data });
    } catch (error) {
      set({ authUser: null });
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
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
