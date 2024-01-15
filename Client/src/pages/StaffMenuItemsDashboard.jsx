import React from "react";
import PageHeader from "../components/Staff/PageHeader";
import MenuItemsList from "../components/StaffMenuItemsDashboard/MenuItemsList";
export default function StaffMenuItemsDashboard() {
  return (
    <div className="StaffMenuItemsDashboard">
      <PageHeader title="Menu Items" />
      <MenuItemsList />
    </div>
  );
}
