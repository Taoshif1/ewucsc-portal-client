import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const navClass = ({ isActive }) =>
  isActive
    ? "font-bold text-primary"
    : "text-base-content/65 transition hover:text-primary";

const TechnicalNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (!moreRef.current?.contains(event.target)) setMoreOpen(false);
    };
    const esc = (event) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const links = (
    <>
      <li><NavLink to="/" className={navClass} onClick={() => setMobileOpen(false)}>Home</NavLink></li>
      <li><NavLink to="/learning-paths" className={navClass} onClick={() => setMobileOpen(false)}>Learning Paths</NavLink></li>
      <li><NavLink to="/tools" className={navClass} onClick={() => setMobileOpen(false)}>Tools</NavLink></li>
      <li><NavLink to="/ctf" className={navClass} onClick={() => setMobileOpen(false)}>CTF</NavLink></li>
      <li><NavLink to="/writeups" className={navClass} onClick={() => setMobileOpen(false)}>Writeups</NavLink></li>
      <li><NavLink to="/labs" className={navClass} onClick={() => setMobileOpen(false)}>Labs</NavLink></li>
      <li><NavLink to="/wiki" className={navClass} onClick={() => setMobileOpen(false)}>Wiki</NavLink></li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 border-b border-white/5 bg-base-100/90 px-4 backdrop-blur-xl lg:px-10">
      <div className="navbar-start">
        <button
          type="button"
          className="btn btn-ghost lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle technical navigation"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
        <Link to="/" className="btn btn-ghost gap-3 hover:bg-transparent">
          <Logo className="h-9 w-9" />
          <div className="hidden text-left sm:block">
            <p className="text-sm font-black">EWUCSC</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Technical Hub</p>
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3 px-1 text-sm font-medium">
          {links}
          <li className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((value) => !value)}
              className="flex items-center gap-1 text-base-content/65 hover:text-primary"
            >
              More <FaChevronDown size={10} className={moreOpen ? "rotate-180" : ""} />
            </button>
            {moreOpen && (
              <ul className="menu absolute left-0 top-full z-[80] mt-2 w-56 rounded-box border border-white/10 bg-base-100 p-2 shadow-2xl">
                <li><NavLink to="/events" onClick={() => setMoreOpen(false)}>Events</NavLink></li>
                <li><NavLink to="/projects" onClick={() => setMoreOpen(false)}>Projects</NavLink></li>
                <li><a href="/vp-resources/index.html">Resource Drop</a></li>
                <li><a href="/arsenal/index.html">Arsenal</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <a href={window.location.origin} className="btn btn-sm btn-ghost hidden sm:inline-flex">
          Tech Home
        </a>
        <ThemeToggle />
      </div>

      <div className={`absolute left-0 top-full w-full lg:hidden ${mobileOpen ? "block" : "hidden"}`}>
        <div className="mx-4 mt-2 rounded-2xl border border-white/10 bg-base-100 p-4 shadow-2xl">
          <ul className="menu gap-2">
            {links}
            <li><NavLink to="/events" onClick={() => setMobileOpen(false)}>Events</NavLink></li>
            <li><NavLink to="/projects" onClick={() => setMobileOpen(false)}>Projects</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechnicalNavbar;
