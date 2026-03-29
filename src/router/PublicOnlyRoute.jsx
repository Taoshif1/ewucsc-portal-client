import { Navigate } from "react-router";
import Spinner from "../components/common/Spinner";
import { useAuth } from "../hooks/useAuth";

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicOnlyRoute;