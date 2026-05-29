import api from "./api";

import type { RegisterRequest, LoginRequest, AuthResponse } from "../types/auth";

const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
}

const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
}

const logout = ():void => {
  localStorage.removeItem("token");
}

const authService = {
  register,
  login,
  logout,
};

export default authService;

