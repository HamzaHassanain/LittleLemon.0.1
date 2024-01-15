import React from "react";
import { useMenuItems } from "../../context/MenuItemsContext";
import { Link } from "react-router-dom";

export default function MenuItemsList() {
  const { menuItems, deleteMenuItem } = useMenuItems();

  console.log(menuItems);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {menuItems.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.category?.name}</td>
            <td className="actions">
              <Link to={"edit/" + item.id} className="btn btn-link">
                Edit
              </Link>
              <button
                className="btn danger"
                onClick={async () => await deleteMenuItem(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
