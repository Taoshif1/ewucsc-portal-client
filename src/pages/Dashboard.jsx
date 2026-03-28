import { Navigate } from "react-router";
import Spinner from "../components/common/Spinner";
import { useUserRole } from "../hooks/useUserRole";

const Dashboard = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (role === "executive") {
    return <Navigate to="/dashboard/executive" replace />;
  }

  if (role === "sub-executive") {
    return <Navigate to="/dashboard/sub" replace />;
  }

  return <Navigate to="/dashboard/member" replace />;
};

export default Dashboard;