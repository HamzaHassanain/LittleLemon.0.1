import React from "react";
import { useOrders } from "../context/OrdersContext";

import Orders from "../components/User/Orders";
import UserHeader from "../components/User/UserHeader";
import ProtectedRoute from "../router/ProtectedRoute";
export default function User() {
  const { orders } = useOrders();

  return (
    <ProtectedRoute>
      <div className="User container">
        <UserHeader />
        <Orders items={orders} />
      </div>
    </ProtectedRoute>
  );
}
