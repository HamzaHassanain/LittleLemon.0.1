import React from "react";
import UsersTable from "./UsersTable";
export default function ManagersTable({ users }) {
  const managers = users.filter((user) => user.role === "manager");
  return (
    <div>
      <UsersTable data={managers} />
    </div>
  );
}
