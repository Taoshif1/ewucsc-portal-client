import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import SiteHome from "../pages/SiteHome";
import TechnicalLearningPath from "../pages/TechnicalLearningPath";
import TechnicalSection, { TechnicalCtf } from "../pages/TechnicalSection";
import Learning from "../pages/Learning";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PendingApproval from "../pages/PendingApproval";

import AdminDashboard from "../pages/dashboards/AdminDashboard";
import ExecutiveDashboard from "../pages/dashboards/ExecutiveDashboard";
import SubExecutiveDashboard from "../pages/dashboards/SubExecutiveDashboard";
import MemberDashboard from "../pages/dashboards/MemberDashboard";
import PortalCTF from "../pages/PortalCTF";
import PortalHomeworks from "../pages/PortalHomeworks";
import PortalLeaderboard from "../pages/PortalLeaderboard";
import AdminUsers from "../pages/AdminUsers";
import OperationsProblems from "../pages/OperationsProblems";
import OperationsAnalytics from "../pages/OperationsAnalytics";
import OperationsContent from "../pages/OperationsContent";
import OperationsSubmissions from "../pages/OperationsSubmissions";

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
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import Credits from "../pages/Credits";
import Gallery from "../pages/Gallery";
import GalleryAdmin from "../pages/GalleryAdmin";
import FormsAdmin from "../pages/FormsAdmin";
import RecruitmentForm from "../pages/RecruitmentForm";
import VPResources from "../pages/VPResources";

import PrivateRoute from "./PrivateRouter";
import RoleRoute from "./RoleRouter";
import ErrorPage from "../pages/ErrorPage";
import PublicOnlyRoute from "./PublicOnlyRoute";
import SubdomainRoute from "./SubdomainRoute";
import {
  authPortalUrl,
  technicalHubUrl,
} from "../config/siteLinks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SiteHome /> },
      { path: "learning", element: <SubdomainRoute href={technicalHubUrl} preservePath><Learning /></SubdomainRoute> },
      { path: "announcements", element: <Announcements /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:slug", element: <BlogDetails /> },
      { path: "partners", element: <Partners /> },
      { path: "about", element: <About /> },
      { path: "resources", element: <SubdomainRoute href={technicalHubUrl} preservePath><Resources /></SubdomainRoute> },
      { path: "contact", element: <Contact /> },
      { path: "credits", element: <Credits /> },
      { path: "gallery", element: <Gallery /> },
      { path: "apply/:formKey", element: <RecruitmentForm /> },
      {
        path: "vp-resources",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <VPResources />
          </SubdomainRoute>
        ),
      },
      {
        path: "learning-paths",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalLearningPath />
          </SubdomainRoute>
        ),
      },
      {
        path: "learning-paths/:track",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalLearningPath />
          </SubdomainRoute>
        ),
      },
      {
        path: "tools",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalSection />
          </SubdomainRoute>
        ),
      },
      {
        path: "ctf",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalCtf />
          </SubdomainRoute>
        ),
      },
      {
        path: "ctf/upcoming",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalCtf />
          </SubdomainRoute>
        ),
      },
      {
        path: "ctf/archive",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalCtf />
          </SubdomainRoute>
        ),
      },
      {
        path: "ctf/practice",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalCtf />
          </SubdomainRoute>
        ),
      },
      {
        path: "writeups",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalSection />
          </SubdomainRoute>
        ),
      },
      {
        path: "labs",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalSection />
          </SubdomainRoute>
        ),
      },
      {
        path: "wiki",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalSection />
          </SubdomainRoute>
        ),
      },
      {
        path: "events",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalSection />
          </SubdomainRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <SubdomainRoute href={technicalHubUrl} preservePath>
            <TechnicalSection />
          </SubdomainRoute>
        ),
      },
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
      <SubdomainRoute href={authPortalUrl} preservePath>
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      </SubdomainRoute>
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
      {
        path: "manage/users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AdminUsers />
          </RoleRoute>
        ),
      },
      {
        path: "manage/problems",
        element: (
          <RoleRoute allowedRoles={["admin", "executive"]}>
            <OperationsProblems />
          </RoleRoute>
        ),
      },
      {
        path: "manage/analytics",
        element: (
          <RoleRoute allowedRoles={["admin", "executive"]}>
            <OperationsAnalytics />
          </RoleRoute>
        ),
      },
      {
        path: "manage/content",
        element: (
          <RoleRoute allowedRoles={["admin", "executive"]}>
            <OperationsContent />
          </RoleRoute>
        ),
      },
      {
        path: "manage/gallery",
        element: (
          <RoleRoute allowedRoles={["admin", "executive"]}>
            <GalleryAdmin />
          </RoleRoute>
        ),
      },
      {
        path: "manage/forms",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <FormsAdmin />
          </RoleRoute>
        ),
      },
      {
        path: "manage/submissions",
        element: (
          <RoleRoute allowedRoles={["admin", "executive", "sub-executive"]}>
            <OperationsSubmissions />
          </RoleRoute>
        ),
      },
      { path: "ctf", element: <PortalCTF /> },
      { path: "homeworks", element: <PortalHomeworks /> },
      { path: "leaderboard", element: <PortalLeaderboard /> },
    ],
  },
  {
    path: "/login",
    element: (
      <SubdomainRoute href={authPortalUrl} preservePath>
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      </SubdomainRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <SubdomainRoute href={authPortalUrl} preservePath>
        <PublicOnlyRoute>
          <Register />
        </PublicOnlyRoute>
      </SubdomainRoute>
    ),
  },
  {
    path: "/pending-approval",
    element: (
      <SubdomainRoute href={authPortalUrl} preservePath>
        <PendingApproval />
      </SubdomainRoute>
    ),
  },
]);
