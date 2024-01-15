import React from "react";
import { useUsers } from "../context/UsersContext";
import ManagersTable from "../components/StaffUsersDashboard/ManagersTable";
import DeliveryCrewTable from "../components/StaffUsersDashboard/DeliveryCrewTable";
import NormalUsersTable from "../components/StaffUsersDashboard/NormalUsersTable";
export default function StaffUsersDashboard() {
  const { users } = useUsers();
  return (
    <div className="StaffUsersDashboard">
      <ManagersTable users={users} />
      <DeliveryCrewTable users={users} />
      <NormalUsersTable users={users} />
    </div>
  );
}
