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
import ExecutivePanel2425 from "../pages/ExecutivePanel2425";
import ExecutivePanel2526 from "../pages/ExecutivePanel2526";
import CurrentMembers from "../pages/CurrentMembers";
import Moderators from "../pages/Moderators";
import Announcements from "../pages/Announcements";
import Blogs from "../pages/Blogs";
import Partners from "../pages/Partners";
import About from "../pages/About";
import Resources from "../pages/Resources";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "ctf", element: <CTF></CTF> },
      { path: "learning", element: <Learning></Learning> },
      { path: "homeworks", element: <Homeworks></Homeworks> },
      { path: "announcements", element: <Announcements /> },
      { path: "blogs", element: <Blogs /> },
      { path: "partners", element: <Partners /> },
      { path: "about", element: <About /> },
      { path: "resources", element: <Resources /> },
      { path: "contact", element: <Contact /> },
      {
        path: "members",
        children: [
          { index: true, element: <Members></Members> },
          { path: "current", element: <CurrentMembers></CurrentMembers> },
          {
            path: "executive-panel-24-25",
            element: <ExecutivePanel2425></ExecutivePanel2425>,
          },
          {
            path: "executive-panel-25-26",
            element: <ExecutivePanel2526></ExecutivePanel2526>,
          },
          {
            path: "moderators",
            element: <Moderators />,
          },
        ],
      },
      {
        path: "dashboard",
        children: [
          { index: true, element: <Dashboard></Dashboard> },

          { path: "admin", element: <AdminDashboard></AdminDashboard> },
          {
            path: "executive",
            element: <ExecutiveDashboard></ExecutiveDashboard>,
          },
          {
            path: "sub",
            element: <SubExecutiveDashboard></SubExecutiveDashboard>,
          },
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
