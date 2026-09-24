import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import { publicApi } from "../services/api";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash, FaGraduationCap } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import ButtonLoader from "../components/common/ButtonLoader";
import {
  isValidStudentId,
  normalizeStudentId,
  studentIdToEmail,
} from "../utils/ewuIdentity";

const Register = () => {
  const { registerUser, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const watchedStudentId = watch("studentId", "");
  const derivedEmail = isValidStudentId(watchedStudentId)
    ? studentIdToEmail(watchedStudentId)
    : "";

  const onSubmit = async (data) => {
    const studentId = normalizeStudentId(data.studentId);

    if (!isValidStudentId(studentId)) {
      toast.error("Enter a valid EWU Student ID, e.g. 2020-1-10-40");
      return;
    }

    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const email = studentIdToEmail(studentId);
    const loadingToast = toast.loading("Submitting EWUCSC registration...");
    setIsSubmitting(true);

    try {
      const result = await registerUser(email, data.password);
      await sendEmailVerification(result.user);

      const firebaseToken = await result.user.getIdToken();

      await publicApi.post(
        "/users",
        {
          uid: result.user.uid,
          name: data.name,
          studentId,
        },
        {
          headers: { Authorization: `Bearer ${firebaseToken}` },
        },
      );

      await logoutUser();

      toast.success("Registration submitted. Check your EWU email.", {
        id: loadingToast,
      });
      navigate("/pending-approval", { state: { email }, replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.code === "auth/email-already-in-use"
          ? "An account already exists for this Student ID."
          : "Registration failed. Please check your information and try again.");

      toast.error(message, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="relative group w-full max-w-lg">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-[var(--radius-box)] blur opacity-25 group-hover:opacity-50 transition duration-700" />
          <div className="relative card w-full bg-base-100/85 backdrop-blur-xl border border-white/10 shadow-2xl p-7 md:p-9">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaGraduationCap size={23} />
            </div>
            <h1 className="text-3xl font-black text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Join EWUCSC
            </h1>
            <p className="text-center text-sm text-base-content/60 mt-2 mb-7">
              EWU students only • Admin approval required
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("name")}
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full bg-base-200/50"
                minLength={2}
                maxLength={100}
                required
              />

              <div>
                <input
                  {...register("studentId")}
                  type="text"
                  placeholder="EWU Student ID — 2020-1-10-40"
                  className="input input-bordered w-full bg-base-200/50"
                  autoComplete="username"
                  required
                />
                <p className="mt-2 px-1 text-xs text-base-content/45">
                  {derivedEmail
                    ? `EWU email: ${derivedEmail}`
                    : "Your institutional email will be generated from your Student ID."}
                </p>
              </div>

              <div className="form-control relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password — minimum 8 characters"
                  minLength={8}
                  className="input input-bordered w-full bg-base-200/50 pr-12"
                  autoComplete="new-password"
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

              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                minLength={8}
                className="input input-bordered w-full bg-base-200/50"
                autoComplete="new-password"
                required
              />

              <div className="rounded-xl border border-warning/15 bg-warning/5 p-4 text-xs leading-relaxed text-base-content/60">
                Registration does not unlock the member portal immediately. Verify your
                EWU email first; an EWUCSC admin must then approve your membership.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full mt-2 border-none text-white bg-gradient-to-r from-primary via-secondary to-accent font-bold disabled:opacity-60"
              >
                {isSubmitting ? <ButtonLoader /> : "Submit Registration"}
              </button>
            </form>

            <p className="text-center text-sm mt-6">
              Already registered?{" "}
              <Link to="/login" className="font-bold text-secondary hover:text-primary">
                Login with Student ID
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
