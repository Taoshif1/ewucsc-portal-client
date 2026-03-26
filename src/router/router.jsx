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
import Members from "../pages/Members";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "ctf", element: <CTF></CTF> },
      { path: "learning", element: <Learning></Learning> },
      { path: "homeworks", element: <Homeworks></Homeworks> },
      { path: "members", element: <Members></Members> },
      {
        path: "dashboard",
        children: [
          { index: true, element: <Dashboard></Dashboard> },

          { path: "admin", element: <AdminDashboard></AdminDashboard> },
          { path: "executive", element: <ExecutiveDashboard></ExecutiveDashboard> },
          { path: "sub", element: <SubExecutiveDashboard></SubExecutiveDashboard> },
          { path: "member", element: <MemberDashboard></MemberDashboard> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);
