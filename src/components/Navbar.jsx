import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMobileMenu = () => setIsOpen(false);

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-primary font-bold"
        : "text-base-content/70 hover:text-primary"
    }`;

  const desktopNavLinkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-primary font-bold bg-primary/10 px-4 py-2 rounded-lg"
        : "text-base-content hover:text-primary px-4 py-2"
    }`;

  const Links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/ctf"
          className={desktopNavLinkClass}
          onClick={closeMobileMenu}
        >
          CTF
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/learning"
          className={navLinkClass}
          onClick={closeMobileMenu}
        >
          Learning Path
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/homeworks"
          className={navLinkClass}
          onClick={closeMobileMenu}
        >
          Homeworks
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard"
          className={navLinkClass}
          onClick={closeMobileMenu}
        >
          Dashboard
        </NavLink>
      </li>

      {/* Members Dropdown */}
      <li>
        <details>
          <summary className="text-base-content/70 hover:text-primary transition-colors duration-200 cursor-pointer">
            Members
          </summary>
          <ul className="p-2 bg-base-100 rounded-box w-64 border border-base-content/10 shadow-2xl">
            <li>
              <NavLink to="/members" onClick={closeMobileMenu}>
                • Panels
              </NavLink>
            </li>
            <li>
              <NavLink to="/members/current" onClick={closeMobileMenu}>
                • Current Members
              </NavLink>
            </li>
            <li>
              <NavLink to="/members/moderators" onClick={closeMobileMenu}>
                • Moderators
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/members/executive-panel-24-25"
                onClick={closeMobileMenu}
              >
                • Executive Panel 24–25
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/members/executive-panel-25-26"
                onClick={closeMobileMenu}
              >
                • Executive Panel 25–26
              </NavLink>
            </li>
          </ul>
        </details>
      </li>

      {/* NEW More Dropdown */}
      <li>
        <details>
          <summary className="text-base-content/70 hover:text-primary transition-colors duration-200 cursor-pointer">
            More
          </summary>
          <ul className="p-2 bg-base-100 rounded-box w-72 border border-base-content/10 shadow-2xl">
            <li>
              <NavLink to="/announcements" onClick={closeMobileMenu}>
                • Latest Announcements & Posts
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" onClick={closeMobileMenu}>
                • Latest Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/partners" onClick={closeMobileMenu}>
                • Sponsors / Club Partners
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMobileMenu}>
                • About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/resources" onClick={closeMobileMenu}>
                • Resources
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMobileMenu}>
                • Contact Us
              </NavLink>
            </li>
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <div className="navbar relative bg-base-100/70 backdrop-blur-xl sticky top-0 z-50 px-4 lg:px-12 border-b border-white/5 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.2)] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-transparent after:via-primary after:to-secondary after:opacity-50">
      <div className="navbar-start">
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="btn btn-ghost lg:hidden text-base-content"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        <NavLink
          to="/"
          className="btn btn-ghost hover:bg-transparent normal-case"
          onClick={closeMobileMenu}
        >
          <Logo className="h-10 w-10" />
        </NavLink>
      </div>

      {/* Desktop Nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-medium">
          {Links}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <ThemeToggle />

        {/* Notification Icon */}
        <button className="btn btn-ghost btn-circle relative">
          <div className="indicator">
            <span className="notification-dot">
              <span className="notification-ping"></span>
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-base-content"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        </button>

        <Link
          to="/login"
          className="btn btn-sm px-8 rounded-full text-white font-bold border-none bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary hover:scale-105 active:scale-95 transition-all duration-500 ease-in-out shadow-lg shadow-primary/30 cursor-pointer"
        >
          Login
        </Link>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`absolute top-full left-0 w-full lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-3 invisible"
        }`}
      >
        <div className="mx-4 mt-3 rounded-2xl border border-base-content/10 bg-base-100/95 backdrop-blur-xl shadow-2xl">
          <ul className="menu p-4 gap-2 font-medium">{Links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;