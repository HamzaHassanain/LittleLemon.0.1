import React from "react";
import Select from "react-select";
import { useUsers } from "../../context/UsersContext";
export default function UsersTable({ data }) {
  const { changeUserRole } = useUsers();
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>
              <Select
                options={[
                  { value: "manager", label: "Manager" },
                  { value: "delivery", label: "Delivery" },
                  { value: "customer", label: "Customer" },
                ]}
                defaultValue={{
                  value: user.role,
                  label: user.role.charAt(0).toUpperCase() + user.role.slice(1),
                }}
                onChange={async (e) => {
                  try {
                    await changeUserRole(user.username, e.value);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
