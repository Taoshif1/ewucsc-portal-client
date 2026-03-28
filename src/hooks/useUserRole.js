import { useAuth } from "./useAuth";

export const useUserRole = () => {
  const { backendUser, loading, profileLoading } = useAuth();

  return {
    role: backendUser?.role || "member",
    roleLoading: loading || profileLoading,
    roleError: null,
    backendUser,
  };
};