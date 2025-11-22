import Loader from "@/components/others/Loader";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const { role, loading, user } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/auth");
      return;
    }

    if (role === "user") navigate("/user/home");
    else if (role === "hospital") navigate("/hospital/home");
  }, [loading, user, role, navigate]);
  return <Loader />;
}
