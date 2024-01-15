import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user?.token || !user?.user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);
  return <div>{children}</div>;
}
