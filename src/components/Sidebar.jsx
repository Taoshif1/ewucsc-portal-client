import { useUserRole } from "../hooks/useUserRole";
import { NavLink } from "react-router";
import Spinner from "./common/Spinner";

import {
  FaUser,
  FaListCheck,     
  FaTrophy,
  FaUsers,
  FaCirclePlus,   
  FaChartLine,
  FaHouse,        
} from "react-icons/fa6";

const Sidebar = () => {
  const { role, roleLoading } = useUserRole();

  const menu = {
    admin: [
      { name: "Admin Home", path: "/dashboard/admin", icon: <FaHouse /> },
      { name: "Manage Users", path: "/dashboard/admin/users", icon: <FaUsers /> },
      { name: "Create Problem", path: "/dashboard/admin/create", icon: <FaCirclePlus /> },
      { name: "Analytics", path: "/dashboard/admin/analytics", icon: <FaChartLine /> },
    ],

    executive: [
      { name: "Executive Home", path: "/dashboard/executive", icon: <FaHouse /> },
      { name: "Manage Problems", path: "/dashboard/executive/problems", icon: <FaListCheck /> },
      { name: "Leaderboard", path: "/dashboard/executive/leaderboard", icon: <FaTrophy /> },
    ],

    "sub-executive": [
      { name: "Sub Executive Home", path: "/dashboard/sub", icon: <FaHouse /> },
      { name: "Review Submissions", path: "/dashboard/sub/review", icon: <FaListCheck /> },
      { name: "Leaderboard", path: "/dashboard/sub/leaderboard", icon: <FaTrophy /> },
    ],

    member: [
      { name: "Member Home", path: "/dashboard/member", icon: <FaHouse /> },
      { name: "Solve Problems", path: "/dashboard/member/problems", icon: <FaListCheck /> },
      { name: "My Score", path: "/dashboard/member/score", icon: <FaTrophy /> },
      { name: "Profile", path: "/dashboard/member/profile", icon: <FaUser /> },
    ],
  };

  if (roleLoading) {
    return (
      <aside className="sticky top-0 hidden min-h-screen w-72 border-r border-base-300 bg-base-100 p-6 lg:block">
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      </aside>
    );
  }

  return (
    <aside className="sticky top-0 hidden min-h-screen w-72 border-r border-base-300 bg-base-100 p-6 lg:block">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-primary tracking-tight">EWUCSC</h2>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-base-content/40">
          Access Level: <span className="text-secondary">{role}</span>
        </p>
      </div>

      <nav>
        <ul className="space-y-1.5">
          {menu[role]?.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                // Logic to ensure "Home" paths get the 'end' prop for correct highlighting
                end={item.path.split('/').length <= 3}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                      : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
