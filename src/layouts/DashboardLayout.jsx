import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
  FaArrowRightFromBracket,
  FaBars,
  FaBullhorn,
  FaChartLine,
  FaClipboardCheck,
  FaFlag,
  FaHouse,
  FaRankingStar,
  FaShieldHalved,
  FaUsersGear,
  FaXmark,
} from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../hooks/useAuth";

const staffLinks = (role) => {
  const links = [
    {
      to:
        role === "admin"
          ? "/dashboard/admin"
          : role === "executive"
            ? "/dashboard/executive"
            : "/dashboard/sub",
      label: "Overview",
      icon: <FaShieldHalved />,
    },
  ];

  if (role === "admin") {
    links.push({
      to: "/dashboard/manage/users",
      label: "Manage Users",
      icon: <FaUsersGear />,
    });
  }

  if (["admin", "executive"].includes(role)) {
    links.push(
      {
        to: "/dashboard/manage/problems",
        label: "Create Problem",
        icon: <FaFlag />,
      },
      {
        to: "/dashboard/manage/analytics",
        label: "Analytics",
        icon: <FaChartLine />,
      },
      {
        to: "/dashboard/manage/content",
        label: "Content & Inbox",
        icon: <FaBullhorn />,
      },
    );
  }

  links.push({
    to: "/dashboard/manage/submissions",
    label: "Submissions",
    icon: <FaClipboardCheck />,
  });

  links.push(
    {
      to: "/dashboard/ctf",
      label: "CTF Arena",
      icon: <FaFlag />,
    },
    {
      to: "/dashboard/leaderboard",
      label: "Leaderboard",
      icon: <FaRankingStar />,
    },
  );

  return links;
};

const StaffNavigation = ({ role, onNavigate, onLogout }) => {
  const links = useMemo(() => staffLinks(role), [role]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/5 p-5">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <FaShieldHalved />
          </div>
          <div>
            <p className="font-black">EWUCSC</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-base-content/40">
              {role} console
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-base-content/35">
          Operations
        </p>
        <div className="space-y-1">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary/12 text-primary"
                    : "text-base-content/60 hover:bg-base-200/60 hover:text-base-content"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>

        <p className="mt-6 px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-base-content/35">
          Website
        </p>
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-base-content/60 transition hover:bg-base-200/60 hover:text-base-content"
        >
          <FaHouse /> Public Home
        </Link>
      </nav>

      <div className="border-t border-white/5 p-4">
        <button
          type="button"
          onClick={onLogout}
          className="btn btn-ghost w-full justify-start text-error"
        >
          <FaArrowRightFromBracket /> Logout
        </button>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { backendUser, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  const role = backendUser?.role || "member";
  const isStaff = role !== "member";

  const logout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  if (!isStaff) {
    return (
      <div className="min-h-screen flex flex-col bg-base-100">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/5 bg-base-100/95 backdrop-blur-xl lg:block">
        <StaffNavigation role={role} onNavigate={() => {}} onLogout={logout} />
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="relative h-full w-[86%] max-w-80 border-r border-white/10 bg-base-100 shadow-2xl">
            <div className="absolute right-3 top-3 z-10">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaXmark />
              </button>
            </div>
            <StaffNavigation
              role={role}
              onNavigate={() => setMenuOpen(false)}
              onLogout={logout}
            />
          </aside>
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/5 bg-base-100/90 px-4 backdrop-blur-xl md:px-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open admin navigation"
            >
              <FaBars />
            </button>
            <Link to="/" className="btn btn-sm btn-ghost">
              <FaHouse /> <span className="hidden sm:inline">Home</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-bold">{backendUser?.name || "EWUCSC Staff"}</p>
              <p className="font-mono text-[10px] uppercase text-base-content/40">{role}</p>
            </div>
            <ThemeToggle />
            <button type="button" onClick={logout} className="btn btn-sm btn-ghost text-error" aria-label="Logout">
              <FaArrowRightFromBracket />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
