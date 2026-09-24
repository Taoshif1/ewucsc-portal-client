import { Navigate, useLocation } from "react-router";
import Spinner from "../components/common/Spinner";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, backendUser, loading, profileLoading } = useAuth();
  const location = useLocation();
  const hasToken = Boolean(localStorage.getItem("access-token"));

  if (loading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user || !hasToken || !backendUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (backendUser.approvalStatus && backendUser.approvalStatus !== "approved") {
    return <Navigate to="/pending-approval" replace />;
  }

  return children;
};

export default PrivateRoute;
