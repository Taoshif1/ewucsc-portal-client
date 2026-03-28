import { Navigate, useLocation } from "react-router";
import Spinner from "../components/common/Spinner";
import { useUserRole } from "../hooks/useUserRole";

const RoleRouter = ({ children, allowedRoles = [] }) => {
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleRouter;