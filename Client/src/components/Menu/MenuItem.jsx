import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
export default function MenuItem({ item }) {
  const { addItemToCart } = useCart();
  async function handleAddToCart() {
    try {
      await addItemToCart(item.id);
      alert("Added to cart");
    } catch (error) {
      console.log(error);
      alert("Error adding to cart " + error?.response?.data?.error);
    }
  }
  return (
    <div className="menu-item">
      <div className="menu-item__image">
        <img src={item.image_url} alt={item.name} />
      </div>
      <div className="menu-item__info">
        <Link to={"/menu/" + item.id} className="link main">
          <h3 className="menu-item__name">{item.name}</h3>
        </Link>
        <Link to={"/menu?category=" + item.category.id} className="link sub">
          <h5 className="menu-item__category">{item.category.name}</h5>
        </Link>
        <p className="menu-item__description ellipsis">{item.description}</p>
        <p className="menu-item__price">{item.price}</p>
      </div>
      <div className="menu-item__add-to-cart">
        <button className="btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
