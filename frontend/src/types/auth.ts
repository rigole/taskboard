export interface User {
  fullName: string;
  email: string;
  image?:string;
  role: "ADMIN" | "USER" | "";
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  fullName: string;
  image: string;
  email: string;
  role: "ADMIN" | "USER";
}
