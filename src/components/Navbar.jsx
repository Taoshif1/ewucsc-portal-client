import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import TechnicalNavbar from "./TechnicalNavbar";
import { useAuth } from "../hooks/useAuth";
import {
  authDashboardUrl,
  authLoginUrl,
  isExternalHref,
  technicalHubUrl,
} from "../config/siteLinks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navbarRef = useRef(null);

  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const onTechnicalHost =
    typeof window !== "undefined" &&
    isExternalHref(technicalHubUrl) &&
    window.location.origin === new URL(technicalHubUrl).origin;

  const closeDropdowns = () => setOpenDropdown(null);
  const closeMobileMenu = () => {
    setIsOpen(false);
    closeDropdowns();
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!event.target.closest("[data-nav-dropdown]")) {
        closeDropdowns();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeDropdowns();
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");
    try {
      setLogoutLoading(true);
      await logoutUser();
      toast.success("Logged out successfully!", { id: loadingToast });
      navigate("/");
      closeMobileMenu();
    } catch (error) {
      toast.error("Logout failed. Try again.", { id: loadingToast });
      console.error("Logout error:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-primary font-bold"
        : "text-base-content/70 hover:text-primary"
    }`;

  const Dropdown = ({ id, label, children, widthClass = "w-64" }) => {
    const open = openDropdown === id;

    return (
      <li className="relative" data-nav-dropdown>
        <button
          type="button"
          onClick={() => setOpenDropdown((current) => (current === id ? null : id))}
          className="flex items-center gap-1.5 text-base-content/70 transition-colors duration-200 hover:text-primary"
          aria-expanded={open}
        >
          {label}
          <FaChevronDown
            size={10}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul
            className={`menu z-[80] mt-2 rounded-box border border-base-content/10 bg-base-100 p-2 shadow-2xl lg:absolute lg:left-0 lg:top-full ${widthClass}`}
          >
            {children}
          </ul>
        )}
      </li>
    );
  };

  const authPortalButton = isExternalHref(authLoginUrl) ? (
    <a
      href={authLoginUrl}
      className="btn btn-sm rounded-full border-none bg-gradient-to-r from-primary to-secondary px-6 font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
    >
      Member Portal
    </a>
  ) : (
    <Link
      to={authLoginUrl}
      className="btn btn-sm rounded-full border-none bg-gradient-to-r from-primary to-secondary px-6 font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
    >
      Member Portal
    </Link>
  );

  const Links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu}>
          Home
        </NavLink>
      </li>

      <li>
        {isExternalHref(technicalHubUrl) ? (
          <a
            href={technicalHubUrl}
            onClick={closeMobileMenu}
            target="_blank"
            rel="noreferrer"
            className="text-base-content/70 transition-colors duration-200 hover:text-primary"
          >
            Technical Hub
          </a>
        ) : (
          <NavLink
            to={technicalHubUrl}
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            Technical Hub
          </NavLink>
        )}
      </li>

      {user && (
        <li>
          {isExternalHref(authDashboardUrl) ? (
            <a
              href={authDashboardUrl}
              onClick={closeMobileMenu}
              className="text-base-content/70 transition-colors duration-200 hover:text-primary"
            >
              Dashboard
            </a>
          ) : (
            <NavLink
              to={authDashboardUrl}
              className={navLinkClass}
              onClick={closeMobileMenu}
            >
              Dashboard
            </NavLink>
          )}
        </li>
      )}

      <Dropdown id="members" label="Members" widthClass="w-64">
        <li><NavLink to="/members" onClick={closeMobileMenu}>Panels</NavLink></li>
        <li><NavLink to="/members/current" onClick={closeMobileMenu}>Current Members</NavLink></li>
        <li><NavLink to="/members/moderators" onClick={closeMobileMenu}>Moderators</NavLink></li>
        <li><NavLink to="/members/executive-panel-24-25" onClick={closeMobileMenu}>Executive Panel 24–25</NavLink></li>
        <li><NavLink to="/members/executive-panel-25-26" onClick={closeMobileMenu}>Executive Panel 25–26</NavLink></li>
      </Dropdown>

      <Dropdown id="more" label="More" widthClass="w-72">
        <li><NavLink to="/announcements" onClick={closeMobileMenu}>Latest Announcements & Posts</NavLink></li>
        <li><NavLink to="/blogs" onClick={closeMobileMenu}>Latest Blogs</NavLink></li>\n        <li><NavLink to="/gallery" onClick={closeMobileMenu}>Gallery</NavLink></li>
        <li><NavLink to="/partners" onClick={closeMobileMenu}>Sponsors / Club Partners</NavLink></li>
        <li><NavLink to="/about" onClick={closeMobileMenu}>About Us</NavLink></li>
        <li><NavLink to="/contact" onClick={closeMobileMenu}>Contact Us</NavLink></li>
      </Dropdown>
    </>
  );

  if (onTechnicalHost) {
    return <TechnicalNavbar />;
  }

  return (
    <div
      ref={navbarRef}
      className="navbar relative sticky top-0 z-50 border-b border-white/5 bg-base-100/70 px-4 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.2)] backdrop-blur-xl after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-transparent after:via-primary after:to-secondary after:opacity-50 lg:px-12"
    >
      <div className="navbar-start">
        <button
          type="button"
          className="btn btn-ghost text-base-content lg:hidden"
          onClick={() => {
            setIsOpen((prev) => !prev);
            closeDropdowns();
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        <NavLink
          to="/"
          className="btn btn-ghost normal-case hover:bg-transparent"
          onClick={closeMobileMenu}
        >
          <Logo className="h-10 w-10" />
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4 px-1 font-medium">
          {Links}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <ThemeToggle />

        {user ? (
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="btn btn-sm cursor-pointer rounded-full border-none bg-gradient-to-r from-error to-secondary px-8 font-bold text-white shadow-lg shadow-primary/30 transition-all duration-500 ease-in-out hover:scale-105 hover:from-secondary hover:to-error active:scale-95 disabled:opacity-70"
          >
            {logoutLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Logging Out...
              </>
            ) : (
              "Logout"
            )}
          </button>
        ) : (
          authPortalButton
        )}
      </div>

      <div
        className={`absolute left-0 top-full w-full transition-all duration-300 ease-in-out lg:hidden ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-4 mt-3 rounded-2xl border border-base-content/10 bg-base-100/95 shadow-2xl backdrop-blur-xl">
          <ul className="menu gap-2 p-4 font-medium">{Links}</ul>

          <div className="p-4 pt-0">
            {user ? (
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="btn w-full rounded-xl border-none bg-gradient-to-r from-error to-secondary font-bold text-white disabled:opacity-70"
              >
                {logoutLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Logging Out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            ) : isExternalHref(authLoginUrl) ? (
              <a href={authLoginUrl} className="btn btn-primary w-full" onClick={closeMobileMenu}>
                Member Portal
              </a>
            ) : (
              <Link to={authLoginUrl} onClick={closeMobileMenu} className="btn btn-primary w-full">
                Member Portal
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
