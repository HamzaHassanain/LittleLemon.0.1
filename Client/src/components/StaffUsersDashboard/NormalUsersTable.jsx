import React from "react";
import UsersTable from "./UsersTable";
export default function NormalUsersTable({ users }) {
  const normalUsers = users.filter(
    (user) => user.role !== "manager" && user.role !== "delivery"
  );
  return (
    <div>
      <UsersTable data={normalUsers} />
    </div>
  );
}
