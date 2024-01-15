import React from "react";
import { useMenuItems } from "../context/MenuItemsContext";
import MenuItems from "../components/Menu/MenuItems";
import { useCategories } from "../context/CategoriesContext";
import { useSearchParams } from "react-router-dom";
export default function Menu() {
  const { menuItems, isLoading } = useMenuItems();
  const { categories } = useCategories();

  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  let categoryName = categoryId
    ? categories.find((c) => c.id === Number(categoryId))?.name
    : "All";
  if (categoryName === undefined) categoryName = "All";

  const filtered = categoryId
    ? menuItems.filter((item) => item.category.id === Number(categoryId))
    : menuItems;
  return (
    <div className="Menu">
      <div className="page-header container">
        <h1>
          Menu: <span className="cateogry"> {categoryName} </span>{" "}
        </h1>
      </div>
      <MenuItems items={filtered} isLoading={isLoading} />
    </div>
  );
}
