import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
export default function CartItem({ item }) {
  const { removeFromCart } = useCart();
  async function handleRemoveItemFromCart() {
    try {
      await removeFromCart(item.id);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={item.menu_item.image_url} alt={item.menu_item.name} />
      </div>
      <div className="cart-item__info">
        <Link to={"/menu/" + item.menu_item.id} className="link main">
          <h3 className="cart-item__name">{item.menu_item.name}</h3>
        </Link>
        <Link
          to={"/menu?category=" + item.menu_item.category.id}
          className="link sub"
        >
          <h5 className="cart-item__category">
            {item.menu_item.category.name}
          </h5>
        </Link>
        <p className="cart-item__description ellipsis">
          {item.menu_item.description}
        </p>
      </div>
      <div className="infos">
        <div className="quantity">Quantity:{item.quantity}</div>
        <div className="unit_price price">Unit Price: {item.unit_price}</div>
        <div className="unit_price price">
          Total: {item.unit_price * item.quantity}
        </div>
        <button className="btn remove" onClick={handleRemoveItemFromCart}>
          Remove
        </button>
      </div>
    </div>
  );
}
