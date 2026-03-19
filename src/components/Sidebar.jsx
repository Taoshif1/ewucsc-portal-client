import { useEffect, useState } from "react";
import { api } from "../services/api";
import { NavLink } from "react-router";

import {
  FaUser,
  FaTasks,
  FaTrophy,
  FaUsers,
  FaPlusCircle,
  FaChartLine,
} from "react-icons/fa";

const Sidebar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/profile");
        setRole(res.data.user.role);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []);

  const menu = {
    admin: [
      { name: "Manage Users", path: "/dashboard/admin/users", icon: <FaUsers /> },
      { name: "Create Problem", path: "/dashboard/admin/create", icon: <FaPlusCircle /> },
      { name: "Analytics", path: "/dashboard/admin/analytics", icon: <FaChartLine /> },
    ],

    executive: [
      { name: "Manage Problems", path: "/dashboard/executive/problems", icon: <FaTasks /> },
      { name: "Leaderboard", path: "/dashboard/executive/leaderboard", icon: <FaTrophy /> },
    ],

    "sub-executive": [
      { name: "Review Submissions", path: "/dashboard/sub/review", icon: <FaTasks /> },
      { name: "Leaderboard", path: "/dashboard/sub/leaderboard", icon: <FaTrophy /> },
    ],

    member: [
      { name: "Solve Problems", path: "/dashboard/member/problems", icon: <FaTasks /> },
      { name: "My Score", path: "/dashboard/member/score", icon: <FaTrophy /> },
      { name: "Profile", path: "/dashboard/member/profile", icon: <FaUser /> },
    ],
  };

  if (!role) return null;

  return (
    <div className="w-64 min-h-screen bg-base-200 p-4">
      <h2 className="text-xl font-bold mb-6 text-primary">Dashboard</h2>

      <ul className="space-y-2">
        {menu[role]?.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-base-300"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;