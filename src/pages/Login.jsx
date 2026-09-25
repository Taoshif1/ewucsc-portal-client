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
  const {
    loginUser,
    logoutUser,
    fetchUserProfile,
    resetPassword,
    resendVerification,
  } = useAuth();
  const { register, handleSubmit, getValues } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [resendingVerification, setResendingVerification] = useState(false);

  const resolveEmail = (identityValue = "") => {
    const identity = identityValue.trim();
    const studentId = normalizeStudentId(identity);
    const isLegacyEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(identity);

    if (!isValidStudentId(studentId) && !isLegacyEmail) {
      return null;
    }

    return isLegacyEmail ? identity.toLowerCase() : studentIdToEmail(studentId);
  };

  const handleForgotPassword = async () => {
    const email = resolveEmail(getValues("studentId"));

    if (!email) {
      toast.error("Enter your EWU Student ID first.");
      return;
    }

    try {
      setResettingPassword(true);
      await resetPassword(email);
      toast.success("Password reset email sent. Check your EWU inbox.");
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        toast.error("Too many requests. Please wait a little and try again.");
      } else {
        toast.success(
          "If an account exists for this Student ID, a password reset email has been requested.",
        );
      }
    } finally {
      setResettingPassword(false);
    }
  };

  const handleResendVerification = async () => {
    const email = resolveEmail(getValues("studentId"));
    const password = getValues("password");

    if (!email) {
      toast.error("Enter your EWU Student ID first.");
      return;
    }

    if (!password) {
      toast.error("Enter your password so Firebase can verify the account.");
      return;
    }

    try {
      setResendingVerification(true);
      const result = await loginUser(email, password);

      if (result.user.emailVerified) {
        toast.success("Your EWU email is already verified.");
        return;
      }

      await resendVerification(result.user);
      toast.success("Verification email sent again. Check your EWU inbox.");
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        toast.error("Too many requests. Please wait a little and try again.");
      } else {
        toast.error("Could not resend verification. Check your Student ID and password.");
      }
    } finally {
      await logoutUser().catch(() => {});
      setResendingVerification(false);
    }
  };

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

      if (code === "EMAIL_NOT_VERIFIED") {
        await logoutUser();
        toast.error(
          message || "Verify your EWU email first. You can resend the verification email below.",
          { id: loadingToast },
        );
      } else if (code === "PENDING_APPROVAL") {
        await logoutUser();
        toast(message || "Your account is waiting for admin approval.", {
          id: loadingToast,
        });
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

              <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={resettingPassword || isSubmitting}
                  className="font-semibold text-primary hover:text-secondary disabled:opacity-50"
                >
                  {resettingPassword ? "Sending reset..." : "Forgot password?"}
                </button>

                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={resendingVerification || isSubmitting}
                  className="font-semibold text-secondary hover:text-primary disabled:opacity-50"
                >
                  {resendingVerification ? "Sending verification..." : "Resend verification email"}
                </button>
              </div>

              <p className="px-1 text-[11px] leading-relaxed text-base-content/40">
                Password reset only needs your Student ID. Resending verification requires
                your Student ID and current password. New member accounts use the EWU email
                derived from their Student ID.
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
