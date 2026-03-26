// src/components/Navbar.jsx
import React from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-colors duration-100 ${
              isActive
                ? "text-primary font-bold"
                : "text-base-content/70 hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/ctf"
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive
                ? "text-primary font-bold bg-primary/10 px-4 py-2 rounded-lg"
                : "text-base-content hover:text-primary px-4 py-2"
            }`
          }
        >
          CTF
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/learning"
          className={({ isActive }) =>
            `transition-colors duration-100 ${
              isActive
                ? "text-primary font-bold"
                : "text-base-content/70 hover:text-primary"
            }`
          }
        >
          Learning Path
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/homeworks"
          className={({ isActive }) =>
            `transition-colors duration-100 ${
              isActive
                ? "text-primary font-bold"
                : "text-base-content/70 hover:text-primary"
            }`
          }
        >
          Homeworks
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `transition-colors duration-100 ${
              isActive
                ? "text-primary font-bold"
                : "text-base-content/70 hover:text-primary"
            }`
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/members"
          className={({ isActive }) =>
            `transition-colors duration-100 ${
              isActive
                ? "text-primary font-bold"
                : "text-base-content/70 hover:text-primary"
            }`
          }
        >
          Members
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100/70 backdrop-blur-xl sticky top-0 z-50 px-4 lg:px-12 border-b border-white/5 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.2)] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-transparent after:via-primary after:to-secondary  after:opacity-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-base-content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-64 border border-base-content/5"
          >
            {Links}
          </ul>
        </div>
        <NavLink
          to="/"
          className="btn btn-ghost hover:bg-transparent normal-case"
        >
          <Logo className="h-10 w-10" />
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-medium">{Links}</ul>
      </div>

      <div className="navbar-end gap-3">
        <ThemeToggle />

        {/* Notification Icon */}
        <button className="btn btn-ghost btn-circle relative">
          <div className="indicator">
            {/* Clean single-indicator setup using CSS classes */}
            <span className="notification-dot">
              <span className="notification-ping"></span>
            </span>

            {/* ICON */}
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

        {/* Login Button */}
        <Link
          to="/login"
          className="btn btn-sm px-8 rounded-full text-white font-bold border-none bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary hover:scale-105 active:scale-95 transition-all duration-500 ease-in-out shadow-lg shadow-primary/30 cursor-pointer"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
