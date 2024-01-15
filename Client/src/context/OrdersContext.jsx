// orders context
import React, { useState, createContext } from "react";
import { getOrders, updateOrderStatus as ___updateOrderStatus } from "../apis";
const OrdersContext = createContext();
const useOrders = () => React.useContext(OrdersContext);
export { OrdersContext, useOrders };

export default function OrdersContextProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  async function reloadOrders() {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function setDeliveryCrew(id, data) {
    id = parseInt(id);
    try {
      const resp = await ___updateOrderStatus(id, data);
      const newOrders = orders.map((order) => {
        if (order.id === id) order.delivery_crew = data.delivery_crew;

        return order;
      });
      console.log(resp);
      setOrders(newOrders);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function updateOrderStatus(id, data) {
    id = parseInt(id);
    try {
      const resp = await ___updateOrderStatus(id, data);
      const newOrders = orders.map((order) => {
        if (order.id === id) order.status = data.status;

        return order;
      });
      console.log(resp);
      setOrders(newOrders);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return (
    <OrdersContext.Provider
      value={{
        orders,
        isLoading,
        updateOrderStatus,
        reloadOrders,
        setDeliveryCrew,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
