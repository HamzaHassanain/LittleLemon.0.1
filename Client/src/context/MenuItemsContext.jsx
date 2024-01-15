import { useContext, createContext, useState, useEffect } from "react";
import {
  getMenuItems,
  removeMenuItem,
  editMenuItem,
  newMenuItem,
} from "../apis";
const MenuItemsContext = createContext();
const useMenuItems = () => useContext(MenuItemsContext);
export { MenuItemsContext, useMenuItems };

export default function MenuItemsProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getMenuItems()
      .then((res) => {
        setMenuItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  async function deleteMenuItem(id) {
    try {
      await removeMenuItem(id);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function updateMenuItem(id, data) {
    id = parseInt(id);
    try {
      const response = await editMenuItem(id, data);
      const updatedItem = response.data;
      setMenuItems((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function createMenuItem(data) {
    try {
      const response = await newMenuItem(data);
      const item = response.data;

      setMenuItems((prev) => [...prev, item]);
      return item.id;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  return (
    <MenuItemsContext.Provider
      value={{
        menuItems,
        isLoading,
        deleteMenuItem,
        createMenuItem,
        updateMenuItem,
      }}
    >
      {children}
    </MenuItemsContext.Provider>
  );
}
