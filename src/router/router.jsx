import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

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
import ExecutivePanel2425 from "../pages/ExecutivePanel2425";
import ExecutivePanel2526 from "../pages/ExecutivePanel2526";
import CurrentMembers from "../pages/CurrentMembers";
import Moderators from "../pages/Moderators";
import Announcements from "../pages/Announcements";
import Partners from "../pages/Partners";
import About from "../pages/About";
import Resources from "../pages/Resources";
import Contact from "../pages/Contact";

import PrivateRoute from "./PrivateRouter";
import RoleRoute from "./RoleRouter";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "ctf", element: <CTF /> },
      { path: "learning", element: <Learning /> },
      { path: "homeworks", element: <Homeworks /> },
      { path: "announcements", element: <Announcements /> },
      { path: "partners", element: <Partners /> },
      { path: "about", element: <About /> },
      { path: "resources", element: <Resources /> },
      { path: "contact", element: <Contact /> },

      {
        path: "members",
        children: [
          { index: true, element: <Members /> },
          { path: "current", element: <CurrentMembers /> },
          { path: "executive-panel-24-25", element: <ExecutivePanel2425 /> },
          { path: "executive-panel-25-26", element: <ExecutivePanel2526 /> },
          { path: "moderators", element: <Moderators /> },
        ],
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },

      {
        path: "admin",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "executive",
        element: (
          <RoleRoute allowedRoles={["executive"]}>
            <ExecutiveDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "sub",
        element: (
          <RoleRoute allowedRoles={["sub-executive"]}>
            <SubExecutiveDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "member",
        element: (
          <RoleRoute allowedRoles={["member"]}>
            <MemberDashboard />
          </RoleRoute>
        ),
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