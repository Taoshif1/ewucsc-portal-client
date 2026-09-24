import { Navigate } from "react-router";
import Spinner from "../components/common/Spinner";
import { useAuth } from "../hooks/useAuth";

const PublicOnlyRoute = ({ children }) => {
  const { user, backendUser, loading, profileLoading } = useAuth();
  const hasToken = Boolean(localStorage.getItem("access-token"));

  if (loading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // A Firebase session alone is not enough to enter the portal.
  // Only redirect away from login/register when the application JWT
  // and Mongo-backed member profile are both available.
  if (user && hasToken && backendUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
