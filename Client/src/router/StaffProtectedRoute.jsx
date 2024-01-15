import React from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;
    if (role !== "manager" && role !== "delivery") {
      navigate("/staff/auth");
    }
  }, [navigate]);
  return <div>{children}</div>;
}
