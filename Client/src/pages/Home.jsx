import React from "react";
import { useMenuItems } from "../context/MenuItemsContext";
import MenuItems from "../components/Menu/MenuItems";
export default function Home() {
  const { menuItems, isLoading } = useMenuItems();

  return (
    <div>
      <MenuItems items={menuItems} isLoading={isLoading} />
    </div>
  );
}
