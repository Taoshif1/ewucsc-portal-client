import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

export const Register = () => {
  const { registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Creating Your Account...");
    try {
      // Create firebase user
      const result = await registerUser(data.email, data.password);

      // Get Firebase ID token
      const firebaseToken = await result.user.getIdToken();

      const userData = {
        uid: result.user.uid,
        name: data.name,
        email: data.email,
      };

      // Send to backend with Firebase token
      const res = await api.post("/users", userData, {
        headers: {
          Authorization: `Bearer ${firebaseToken}`,
        },
      });

      // Store JWT access token
      localStorage.setItem("access-token", res.data.token);
      toast.success("Account created successfully!", { id: loadingToast });

      console.log("JWT saved:", res.data.token);
      console.log("User saved + JWT stored");
    } catch (error) {
      toast.error("Registration failed. Try again.", { id: loadingToast });
      console.error("Register error:", error.response?.data || error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              Create Account
            </h1>

            <p className="text-center text-sm text-base-content/70 mb-6">
              Join the community today
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Full Name"
                  className="input border-2 border-base-300 focus:border-primary transition-all w-full bg-base-200/50"
                  required
                />
              </div>

              <div className="form-control">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email Address"
                  className="input border-2 border-base-300 focus:border-primary transition-all w-full bg-base-200/50"
                  required
                />
              </div>

              {/* Password Field with Gradient Toggle */}
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
                  onClick={togglePasswordVisibility}
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
                Sign Up
              </button>
            </form>

            <p className="text-center text-sm mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-secondary hover:text-primary transition-colors underline decoration-2 underline-offset-4"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Register;
