import React from "react";
import Sidebar from "./Sidebar";
export default function Delivery() {
  const links = [{ name: "Orders", path: "/orders" }];
  return (
    <div className="dashboard">
      <Sidebar links={links} />
    </div>
  );
}
