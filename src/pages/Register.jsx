import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Register = () => {
  const { registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data.email, data.password);
      const userData = {
        uid: result.user.uid,
        name: data.name,
        email: data.email,
        role: "member",
      };
      await api.post("/users", userData);
      console.log("User saved in DB");
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Centering Wrapper */}
      <div className="flex-grow flex items-center justify-center bg-base-200 p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-primary">
            Register
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <input
                {...register("name")}
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password Field with React Icon Toggle */}
            <div className="form-control relative w-full">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-12"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-primary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
