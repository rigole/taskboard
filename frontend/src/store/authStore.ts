import { create } from "zustand";
import authService from "../services/authService";
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
} from "../types/auth";

interface AuthState {
  user: AuthResponse | null;
  register: (data: RegisterRequest) => Promise<void>;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  error: string | null;
  loading: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  register: async (data: RegisterRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.register(data);
      set({ user: response, loading: false, error: null });
      localStorage.setItem("token", response.token);
    } catch (error) {
      console.error("Registration failed:", error);
      set({ loading: false, error: "Registration failed" });
    }
  },
  login: async (data: LoginRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.login(data);
      set({ user: response, loading: false, error: null });
      localStorage.setItem("token", response.token);
    } catch (error) {
      console.error("Login failed:", error);
      set({ loading: false, error: "Login failed" });
    }
  },
  logout: () => {
    authService.logout();
    set({ user: null, loading: false, error: null });
  },
}));
