import React from "react";
import { useCart } from "../context/CartContext";
import CartItems from "../components/Cart/CartItems";
import { useOrders } from "../context/OrdersContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/Generics/Input";
import ProtectedRoute from "../router/ProtectedRoute";
export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, palceOrder } = useCart();

  const [date_errors, setDateErrors] = React.useState("");
  const [date, setDate] = React.useState("");

  const { reloadOrders } = useOrders();
  const [total, setTotal] = React.useState(0);
  async function handlePlaceOrder() {
    // check if date is valid
    if (!date) {
      setDateErrors("Date is required");
      return;
    }

    try {
      await palceOrder(date);
      await reloadOrders();
      navigate("/user");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <ProtectedRoute>
      <div className="Cart">
        <CartItems items={cartItems} setTotalPrice={setTotal} />
        <div className="container">
          <div className="place-order">
            <h1 className="price">Total: {total}</h1>
            <button className="btn place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
            <Input
              error={date_errors}
              type="date"
              placeholder="Needed Date"
              value={date}
              title="Needed Date"
              className="date"
              handleChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
