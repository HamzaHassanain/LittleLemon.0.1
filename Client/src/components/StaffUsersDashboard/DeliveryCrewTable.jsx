import React from "react";
import UsersTable from "./UsersTable";
export default function DeliveryCrewTable({ users }) {
  const deliveryCrew = users.filter((user) => user.role === "delivery");
  return (
    <div>
      <UsersTable data={deliveryCrew} />
    </div>
  );
}
