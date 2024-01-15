import React from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../context/CategoriesContext";

export default function CategoriesList() {
  const { categories, deleteCategory } = useCategories();
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td className="actions">
              <Link to={"edit/" + item.id} className="btn btn-link">
                Edit
              </Link>
              <button
                className="btn danger"
                onClick={async () => await deleteCategory(item.id)}
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
