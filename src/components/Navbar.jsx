// src/components/Navbar.jsx
import React from "react";
import Logo from "./Logo";
import { NavLink } from "react-router";

const Navbar = () => {
  const Links = (
    <>
      <li>
        <NavLink
          to="/ctf"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : "text-neutral-content hover:text-primary"
          }
        >
          CTF
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/learning"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : "text-neutral-content hover:text-primary"
          }
        >
          Learning Path
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/homeworks"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : "text-neutral-content hover:text-primary"
          }
        >
          Homeworks
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : "text-neutral-content hover:text-primary"
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100/70 backdrop-blur-xl sticky top-0 z-50 border-b border-primary/20 shadow-[0_0_25px_rgba(37,99,235,0.12)] px-4 lg:px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-neutral-content"
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-200 rounded-box w-64 border border-white/5"
          >
            {Links}
          </ul>
        </div>

        {/* Logo */}
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

      <div className="navbar-end gap-2">
        {/* Notification Icon */}
        <button className="btn btn-ghost btn-circle text-neutral-content">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {/* Login Button */}
        <button className="btn btn-sm px-8 rounded-full text-white font-bold border-none bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary hover:scale-105 active:scale-95 transition-all duration-500 ease-in-out  shadow-lg shadow-primary/30 hover:shadow-secondary/40 cursor-pointer">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
