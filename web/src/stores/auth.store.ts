import create from "zustand";
import { persist } from 'zustand/middleware';

export interface AuthStore {
  token?: string;
  isLogged: boolean;
  setToken: (token: string) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    set => ({
      token: undefined,
      isLogged: false,
      setToken: (token) => set({ token, isLogged: !!token }),
    }),
    {
      name: 'auth'
    }
  )
);

export const getAuthToken = () => useAuthStore.getState().token;

export const setAuthToken = (token: string) => useAuthStore.getState().setToken(token);

export const isLogged = () => useAuthStore.getState().isLogged;
