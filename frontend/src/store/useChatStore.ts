import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { User } from "../types/user";

interface ChatState {
  messages: string[];
  users: User[];
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isOnlineUsersLoading: boolean;
  setSelectedUser: (user: User | null) => void;
  onlineUsers: User[];
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  onlineUsers: [],
  isOnlineUsersLoading: false,

  getOnlineUsers: async () => {
    set({ isOnlineUsersLoading: true });
    try {
      const response = await axiosInstance.get("messages/online-users");
      set({ onlineUsers: response.data.data });
    } catch (error) {
      toast.error("Something went wrong, Unable to fetch online users");
      console.error(error);
    } finally {
      set({ isOnlineUsersLoading: false });
    }
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("messages/users");
      set({ users: response.data.data });
    } catch (error) {
      toast.error("Something went wrong, Unable to fetch users");
      console.error(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`messages/${userId}`);
      set({ messages: response.data.data });
    } catch (error) {
      toast.error("Something went wrong, Unable to fetch messages");
      console.error(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  //todo optimize this function later.
  setSelectedUser: (user: User | null) => {
    set({ selectedUser: user });
  },
}));
