import React from "react";
import Form from "../components/Auth/Form";
import { register, login } from "../apis/index";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
export default function Auth() {
  const { user, setUser } = useUser();
  const { repopulateCart } = useCart();
  const { reloadOrders } = useOrders();
  const { type } = useParams();
  const navigate = useNavigate();
  const Empty = {
    username: "",
    email: "",
    password: "",
  };
  const [data, setData] = React.useState(Empty);
  const [errors, setErrors] = React.useState(Empty);
  function handleFormSubmit(e) {
    e.preventDefault();
    if (type === "register") handleRegister();
    else handleLogin();
  }

  async function handleRegister() {
    try {
      await register(data);
      setErrors(Empty);

      navigate("/auth/login");
    } catch (error) {
      const data = error.response.data;
      if (data)
        setErrors({
          username: data.username ? data.username[0] : "",
          email: data.email ? data.email[0] : "",
          password: data.password ? data.password[0] : "",
          non_field_errors: data.non_field_errors,
        });
      else setErrors({ ...Empty, unknown_error: error.message });
    }
  }
  async function handleLogin() {
    try {
      const response = await login(data);
      const token = response.data.token;

      setUser(token);

      await repopulateCart();
      await reloadOrders();

      setTimeout(() => {
        navigate("/");
      }, 100);

      setErrors(Empty);
    } catch (error) {
      const data = error.response.data;
      if (data)
        setErrors({
          username: data.username ? data.username[0] : "",
          email: data.email ? data.email[0] : "",
          password: data.password ? data.password[0] : "",
          non_field_errors: data.non_field_errors,
        });
      else setErrors({ ...Empty, unknown_error: error.message });
    }
  }

  if (user?.token)
    setTimeout(() => {
      navigate("/");
    }, 100);

  return (
    <div className="container auth-form">
      <h1> {type === "register" ? "Register" : "Login"} </h1>
      <p className="error container"> {errors.unknown_error} </p>
      <div className="error container">
        {errors.non_field_errors?.map((err) => (
          <p key={err}>{err}</p>
        ))}{" "}
      </div>
      <Form
        handleFormSubmit={handleFormSubmit}
        data={data}
        setData={setData}
        errors={errors}
      />
    </div>
  );
}
