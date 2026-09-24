import { Link, useLocation } from "react-router";
import { FaClock, FaEnvelopeCircleCheck, FaShieldHalved } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PendingApproval = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <section className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-warning/20 bg-base-100/75 p-8 md:p-12 backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_35%)]" />
          <div className="relative z-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-warning/30 bg-warning/10 text-warning">
              <FaClock size={28} />
            </div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-warning">
              Membership review
            </p>
            <h1 className="text-3xl md:text-5xl font-black">
              Your account is <span className="text-warning">pending approval.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base-content/65 leading-relaxed">
              Your EWUCSC account has been submitted. Verify your EWU student email,
              then wait for a club admin to approve your membership before signing in
              to the private member portal.
            </p>

            {email && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm text-secondary">
                <FaEnvelopeCircleCheck />
                {email}
              </div>
            )}

            <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
              {[
                ["01", "Verify EWU email", "Open the verification email sent to your institutional inbox."],
                ["02", "Admin review", "EWUCSC administration verifies the registration request."],
                ["03", "Portal access", "After approval, log in with Student ID + password."],
              ].map(([step, title, desc]) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-base-200/45 p-5">
                  <span className="font-mono text-xs text-primary">{step}</span>
                  <h2 className="mt-2 font-bold">{title}</h2>
                  <p className="mt-2 text-sm text-base-content/60">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/login" className="btn btn-primary rounded-full px-7">
                <FaShieldHalved /> Back to Login
              </Link>
              <Link to="/" className="btn btn-ghost rounded-full px-7">
                Return Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PendingApproval;
