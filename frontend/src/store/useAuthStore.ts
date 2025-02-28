import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { RegisterFormData } from "../pages/RegisterPage";

interface AuthState {
  authUser: any | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signUp: (data: RegisterFormData) => Promise<void>;
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
      const response = await axiosInstance.post("/auth/register", data);
      set({ authUser: response.data.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
