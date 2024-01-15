// cartContext

import React, { useState, createContext } from "react";
import { getCartItems, addToCart, makeOrder, deleteCartItem } from "../apis";
import { useUser } from "./UserContext";
const CartContext = createContext();
const useCart = () => React.useContext(CartContext);
export { CartContext, useCart };

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  React.useEffect(() => {
    if (!user?.token) return;
    getCartItems()
      .then((res) => {
        setCartItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [user]);
  async function repopulateCart() {
    try {
      const response = await getCartItems();
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function addItemToCart(id, quantity = 1) {
    try {
      const response = await addToCart({ menuitem: id, quantity });
      setCartItems([...cartItems, response.data]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function palceOrder(__date) {
    try {
      const date = __date ? __date : new Date().toISOString().split("T")[0];
      const response = await makeOrder({
        date,
      });
      console.log(response.data);
      setCartItems([]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function removeFromCart(id) {
    try {
      await deleteCartItem(id);
      const newCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(newCartItems);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addItemToCart,
        repopulateCart,
        palceOrder,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
