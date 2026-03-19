import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");

        const role = res.data.user.role;

        // 🔥 Role-based redirect
        if (role === "admin") navigate("/dashboard/admin");
        else if (role === "executive") navigate("/dashboard/executive");
        else if (role === "sub-executive") navigate("/dashboard/sub");
        else navigate("/dashboard/member");

      } catch (error) {
        console.error("Unauthorized", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return null;
};

export default Dashboard;