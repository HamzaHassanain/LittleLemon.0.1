import React from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
export default function Manager({ children }) {
  const navigate = useNavigate();
  const links = [
    { name: "Users", to: "/staff/manager/users" },
    { name: "Menu Items", to: "/staff/manager/menu-items" },
    { name: "Categories", to: "/staff/manager/categories" },
    { name: "Orders", to: "/staff/manager/orders" },
  ];
  React.useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user")).role;
    if (role !== "manager") {
      navigate("/staff/auth");
    }
  });
  return (
    <Layout links={links}>
      <div className="dashboard-body-content">{children}</div>
    </Layout>
  );
}
