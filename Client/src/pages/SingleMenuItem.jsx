import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMenuItems } from "../context/MenuItemsContext";
import Loader from "../components/Generics/Loader";
import Input from "../components/Generics/Input";
import { useCart } from "../context/CartContext";
export default function SingleMenuItem() {
  const { id } = useParams();
  const { addItemToCart } = useCart();

  const navigate = useNavigate();
  const { menuItems, isLoading } = useMenuItems();
  const menuItem = menuItems.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = React.useState(1);

  async function handleAddToCart() {
    try {
      await addItemToCart(Number(id), Number(quantity));
      alert("Added to cart with quantity " + quantity);
    } catch (error) {
      console.log(error);
      alert("Error adding to cart " + error?.response?.data?.error);
    }
  }

  if (!menuItem) navigate("/404");
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="SingleMenuItem">
      <div className="page-header container">
        <Link to="/menu" className="link main">
          Back to Menu
        </Link>
        <h1>
          {menuItem.name}{" "}
          <Link
            to={"/menu?category=" + menuItem.category.id}
            className="category link"
          >
            {" "}
            ({menuItem.category.name}){" "}
          </Link>{" "}
        </h1>
      </div>
      <div className="container">
        <div className="item">
          <div className="details">
            <h2>{menuItem.name}</h2>
            <h4 className="category">Category: {menuItem.category.name}</h4>
            <br />
            <p>{menuItem.long_description}</p>
            <p className="price"> {menuItem.price} </p>

            <div className="add-to-cart">
              <button className="btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <Input
                label="Quantity"
                type="number"
                value={quantity}
                handleChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className="image">
            <img src={menuItem.image_url} alt={menuItem.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
