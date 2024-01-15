import React, { useEffect } from "react";
import Loader from "../Generics/Loader";
import NoItems from "../Generics/NoItems";
import CartItem from "./CartItem";

export default function CartItems({ items, isLoading, setTotalPrice }) {
  useEffect(() => {
    if (items?.length) {
      const total = items.reduce((acc, item) => {
        return acc + item.quantity * item.unit_price;
      }, 0);
      setTotalPrice(total);
    }
  }, [items, setTotalPrice]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container cart-items">
      {items?.length ? (
        items.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <NoItems />
      )}
    </div>
  );
}
