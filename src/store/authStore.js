import {create} from 'zustand';

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('authToken') || null,  // Fetch token from localStorage if exists
  user: null,  // Store user data here
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
}));
