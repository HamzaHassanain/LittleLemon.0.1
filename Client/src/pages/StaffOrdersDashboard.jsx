import React from "react";
import PageHeader from "../components/Staff/PageHeader";
import OrdersList from "../components/StaffOrdersDashboard/OrdersList";
export default function StaffOrdersDashboard() {
  return (
    <div className="StaffMenuItemsDashboard">
      <PageHeader title="Orders" />
      <OrdersList status={false} />
      <OrdersList status={true} />
    </div>
  );
}
