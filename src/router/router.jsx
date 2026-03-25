import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import CTF from "../pages/CTF";
import Learning from "../pages/Learning";
import Homeworks from "../pages/Homeworks";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/dashboards/AdminDashboard";
import ExecutiveDashboard from "../pages/dashboards/ExecutiveDashboard";
import SubExecutiveDashboard from "../pages/dashboards/SubExecutiveDashboard";
import MemberDashboard from "../pages/dashboards/MemberDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "ctf", element: <CTF /> },
      { path: "learning", element: <Learning /> },
      { path: "homeworks", element: <Homeworks /> },
      {
        path: "dashboard",
        children: [
          { index: true, element: <Dashboard /> },

          { path: "admin", element: <AdminDashboard /> },
          { path: "executive", element: <ExecutiveDashboard /> },
          { path: "sub", element: <SubExecutiveDashboard /> },
          { path: "member", element: <MemberDashboard /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
