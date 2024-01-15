import React from "react";
import { useOrders } from "../../context/OrdersContext";
import { Link } from "react-router-dom";
import SelectDeliveryFrom from "./SelectDeliveryFrom";
import OrderStatus from "../Generics/OrderStatus";
export default function OrdersList({ status }) {
  const { orders } = useOrders();

  const filteredOrders = orders.filter((order) => !(order.status ^ status));
  filteredOrders.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Needed Date</th>
          <th>Customer Username</th>
          <th>Order Status</th>
          <th>Order Total</th>
          <th>Deleivery Crew</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrders.map((order) => (
          <tr key={order.id}>
            <td>
              <Link to={`/staff/manager/orders/${order.id}`}>{order.id} </Link>
            </td>
            <td>{order.date}</td>
            <td>{order.user.username}</td>
            <OrderStatus status={order.status} orderId={order.id} />
            <td>{order.total}</td>
            <td>
              <SelectDeliveryFrom
                orderId={order.id}
                curDelivery={order.delivery_crew}
              />{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
