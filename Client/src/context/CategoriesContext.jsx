import { useContext, createContext, useState, useEffect } from "react";
import {
  getCategoiries,
  removeCategory,
  editCategory,
  newCategory,
} from "../apis";
const CategoriesContext = createContext();
const useCategories = () => useContext(CategoriesContext);

export { CategoriesContext, useCategories };

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCategoiries()
      .then((res) => {
        setCategories(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  async function deleteCategory(id) {
    try {
      await removeCategory(id);
      setCategories(categories.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function updateCategory(id, data) {
    try {
      const response = await editCategory(id, data);
      const newCategories = categories.map((item) =>
        item.id === id ? response.data : item
      );
      setCategories(newCategories);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function createCategory(data) {
    try {
      const response = await newCategory(data);
      setCategories([...categories, response.data]);
      return response.data.id;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading,
        deleteCategory,
        updateCategory,
        createCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
