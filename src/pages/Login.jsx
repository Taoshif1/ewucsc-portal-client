import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser } = useAuth();
  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Logging in...");

    try {
      const result = await loginUser(data.email, data.password);

      const firebaseToken = await result.user.getIdToken();

      const res = await api.post(
        "/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${firebaseToken}`,
          },
        },
      );

      localStorage.setItem("access-token", res.data.token);
      toast.success("Login successful!", { id: loadingToast });

      console.log("Login success");
    } catch (error) {
      toast.error("Invalid email or password", { id: loadingToast });
      console.error("Login error:", error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center bg-base-200 p-4">
        {/* THE UPGRADED BOX: Multi-color gradient wrapper */}
        <div className="relative group w-full max-w-md">
          {/* Animated Glow Background */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-[var(--radius-box)] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

          {/* Main Card */}
          <div className="relative card w-full bg-base-100/80 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
            <h1 className="text-3xl font-black mb-2 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Welcome Back
            </h1>

            <p className="text-center text-sm text-base-content/70 mb-6">
              Login to continue your journey
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email Address"
                  className="input border-2 border-base-300 focus:border-primary transition-all w-full bg-base-200/50"
                  required
                />
              </div>

              <div className="form-control relative w-full">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input border-2 border-base-300 focus:border-primary transition-all w-full pr-12 bg-base-200/50"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-2 right-2 px-3 flex items-center text-white bg-gradient-to-br from-primary via-secondary to-accent hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer rounded-lg"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="btn w-full mt-6 border-none text-white bg-gradient-to-r from-primary via-secondary to-accent hover:saturate-150 hover:scale-[1.02] active:scale-95 transition-all duration-500 shadow-xl shadow-primary/20 font-bold text-lg"
              >
                Login
              </button>

              <p className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-secondary hover:text-primary transition-colors underline decoration-2 underline-offset-4"
                >
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
