import React from "react";
import { useOrders } from "../../context/OrdersContext";

export default function OrderStatus({ orderId, status }) {
  const [orderStatus, setOrderStatus] = React.useState(status);
  const { updateOrderStatus } = useOrders();
  return (
    <td
      className={orderStatus ? "did" : "no"}
      onClick={async (e) => {
        try {
          await updateOrderStatus(orderId, { status: !orderStatus });
          setOrderStatus(!orderStatus);
        } catch (error) {
          console.log(error);
        }
      }}
    ></td>
  );
}
