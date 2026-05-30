import {useForm} from "react-hook-form";
import type {LoginRequest} from "../types/auth";
import {useAuthStore} from "../store/authStore";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  const navigate = useNavigate();
  const loggedUser = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.loading);
  const authError = useAuthStore((state) => state.error);
  const onSubmit = async (data: LoginRequest) => {
    try {
      await loggedUser(data);
      toast.success("User logged in successfully.");
      navigate("/profile");
    } catch (error) {
      toast.error(
        authError || "Login failed. Please check your credentials.",
      );
      console.error("Registration failed:", error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-[400px]"
      >
        <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl">
          T
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">TaskFlow</h1>
        <p className="text-xl font-bold mb-6 text-center">
          Handle your projects easily
        </p>
        <input
          type="text"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
          placeholder="Email"
          className={`w-full border p-3 mb-4 rounded ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300"}`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mb-4 block">
            {errors.email.message}
          </span>
        )}
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
          placeholder="Password"
          className={`w-full border p-3 mb-4 rounded ${errors.password ? "border-red-500 bg-red-50" : "border-gray-300"}`}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mb-4 block">
            {errors.password.message}
          </span>
        )}
        <button className="w-full bg-black text-white p-3 rounded">
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          <span>{isLoading ? "Signin In..." : "sign In"}</span>
        </button>
      </form>
    </div>
  );
};
