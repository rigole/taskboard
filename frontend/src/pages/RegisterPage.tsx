import { useForm } from "react-hook-form";
import type { RegisterRequest } from "../types/auth";
import { useAuthStore } from "../store/authStore";

export const RegisterPage = () => {
  const { register, handleSubmit } = useForm<RegisterRequest>();
  const registerUser = useAuthStore((state) => state.register);
  const onSubmit = async (data: RegisterRequest) => {
    try {
      await registerUser(data);
    } catch (error) {
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
          {...register("fullName")}
          placeholder="Full Name"
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
        />

        <button className="w-full bg-black text-white p-3 rounded">
          Register
        </button>
      </form>
    </div>
  );
};
