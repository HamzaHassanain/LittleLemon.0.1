import React from "react";
import Layout from "./Layout";
export default function DeliveryLayout({ children }) {
  const links = [{ name: "Orders", to: "/staff/delivery/orders" }];
  return (
    <Layout links={links}>
      <div className="dashboard-body-content">{children}</div>
    </Layout>
  );
}
