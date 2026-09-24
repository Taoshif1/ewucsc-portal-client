import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { publicApi } from "../services/api";
import Navbar from "../components/Navbar";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaShieldHalved } from "react-icons/fa6";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import ButtonLoader from "../components/common/ButtonLoader";
import {
  isValidStudentId,
  normalizeStudentId,
  studentIdToEmail,
} from "../utils/ewuIdentity";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, logoutUser, fetchUserProfile } = useAuth();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    const identity = data.studentId.trim();
    const studentId = normalizeStudentId(identity);
    const isLegacyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity);

    if (!isValidStudentId(studentId) && !isLegacyEmail) {
      toast.error("Enter a valid EWU Student ID.");
      return;
    }

    const email = isLegacyEmail ? identity.toLowerCase() : studentIdToEmail(studentId);
    const loadingToast = toast.loading("Authenticating...");
    setIsSubmitting(true);

    try {
      const result = await loginUser(email, data.password);
      const firebaseToken = await result.user.getIdToken(true);

      const res = await publicApi.post(
        "/login",
        {},
        { headers: { Authorization: `Bearer ${firebaseToken}` } },
      );

      localStorage.setItem("access-token", res.data.token);
      await fetchUserProfile();

      toast.success("Access granted.", { id: loadingToast });

      const destination = location.state?.from?.pathname || "/dashboard";
      navigate(destination, { replace: true });
    } catch (error) {
      const code = error.response?.data?.code;
      const message = error.response?.data?.message;

      if (["PENDING_APPROVAL", "EMAIL_NOT_VERIFIED"].includes(code)) {
        await logoutUser();
        toast(message || "Your account is not ready yet.", { id: loadingToast });
        navigate("/pending-approval", { state: { email }, replace: true });
      } else if (code === "ACCOUNT_REJECTED" || code === "ACCOUNT_SUSPENDED") {
        await logoutUser();
        toast.error(message || "This account cannot access the portal.", {
          id: loadingToast,
        });
      } else {
        toast.error("Invalid Student ID or password.", { id: loadingToast });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="relative group w-full max-w-md">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-[var(--radius-box)] blur opacity-25 group-hover:opacity-50 transition duration-700" />
          <div className="relative card bg-base-100/85 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <FaShieldHalved size={22} />
            </div>
            <h1 className="text-3xl font-black text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Member Access
            </h1>
            <p className="text-center text-sm text-base-content/60 mt-2 mb-7">
              Approved EWUCSC members
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("studentId")}
                type="text"
                placeholder="EWU Student ID"
                className="input input-bordered w-full bg-base-200/50"
                autoComplete="username"
                required
              />

              <div className="form-control relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full bg-base-200/50 pr-12"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-2 right-2 px-3 rounded-lg text-primary"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <p className="px-1 text-[11px] leading-relaxed text-base-content/40">
                During migration, existing admin/executive accounts may use their current
                email address. New member accounts must use an EWU Student ID.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full border-none text-white bg-gradient-to-r from-primary via-secondary to-accent font-bold disabled:opacity-60"
              >
                {isSubmitting ? <ButtonLoader /> : "Enter Portal"}
              </button>
            </form>

            <p className="text-center text-sm mt-6">
              New member?{" "}
              <Link to="/register" className="font-bold text-secondary hover:text-primary">
                Register with EWU ID
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
