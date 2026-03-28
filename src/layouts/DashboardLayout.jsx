import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;