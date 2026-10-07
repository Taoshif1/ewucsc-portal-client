import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaArrowRightFromBracket, FaHouse, FaShieldHalved } from "react-icons/fa6";

import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";
import { authDashboardUrl, publicSiteUrl } from "../config/siteLinks";

const PortalNavbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");

    try {
      setLogoutLoading(true);
      await logoutUser();
      toast.success("Logged out successfully!", { id: loadingToast });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Portal logout error:", error);
      toast.error("Logout failed. Try again.", { id: loadingToast });
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-base-100/90 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.2)] backdrop-blur-xl">
      <div className="navbar px-4 lg:px-12">
        <div className="navbar-start">
          <a
            href={publicSiteUrl}
            className="btn btn-ghost gap-3 px-2 normal-case hover:bg-transparent"
            aria-label="Open EWUCSC public website"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <FaShieldHalved />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-black">EWUCSC</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                Member Portal
              </p>
            </div>
          </a>
        </div>

        <div className="navbar-end gap-2">
          {user && (
            <a
              href={authDashboardUrl}
              className="btn btn-sm btn-ghost hidden gap-2 sm:inline-flex"
            >
              <FaHouse />
              Dashboard
            </a>
          )}

          <a
            href={publicSiteUrl}
            className="btn btn-sm btn-outline hidden rounded-full sm:inline-flex"
          >
            Public Site
          </a>

          <ThemeToggle />

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutLoading}
              className="btn btn-sm rounded-full border-none bg-gradient-to-r from-error to-secondary px-5 font-bold text-white disabled:opacity-70"
            >
              {logoutLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <FaArrowRightFromBracket />
              )}
              <span className="hidden sm:inline">
                {logoutLoading ? "Logging Out..." : "Logout"}
              </span>
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm rounded-full border-none bg-gradient-to-r from-primary to-secondary px-5 font-bold text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default PortalNavbar;
