import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 500) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
