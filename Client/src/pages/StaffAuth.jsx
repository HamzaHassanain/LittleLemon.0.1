import React from "react";
import Input from "../components/Generics/Input";
import { staffLogin } from "../apis/index";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Select from "react-select";

export default function Auth() {
  const { setStaffUser } = useUser();
  const navigate = useNavigate();
  const Empty = {
    username: "",
    password: "",
    role: "",
  };
  const [data, setData] = React.useState(Empty);
  const [errors, setErrors] = React.useState(Empty);
  function handleFormSubmit(e) {
    e.preventDefault();
    handleLogin();
    // console.log(data);
  }

  async function handleLogin() {
    try {
      const response = await staffLogin(data);
      const token = response.data.token;

      setStaffUser(token, data.role);

      setTimeout(() => {
        if (data.role === "manager" || data.role === "admin")
          navigate("/staff/manager/users");
        else if (data.role === "delivery") navigate("/staff/delivery/orders");
      }, 100);

      setErrors(Empty);
    } catch (error) {
      const data = error?.response?.data;
      if (data)
        setErrors({
          username: data.username ? data.username[0] : "",
          password: data.password ? data.password[0] : "",
          non_field_errors: data.non_field_errors,
        });
      else setErrors({ ...Empty, unknown_error: error.message });
    }
  }
  const options = [
    { value: "manager", label: "Manager" },
    { value: "delivery", label: "Delivery" },
  ];
  return (
    <div className="container auth-form">
      <h1> Staff Authentication </h1>
      <p className="error container"> {errors.unknown_error} </p>
      <div className="error container">
        {errors.non_field_errors?.map((err) => (
          <p key={err}>{err}</p>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          id="username"
          title={"Username"}
          value={data.username}
          handleChange={(e) => setData({ ...data, username: e.target.value })}
          error={errors.username}
        />
        <Input
          type="password"
          name="password"
          title={"Password"}
          value={data.password}
          handleChange={(e) => setData({ ...data, password: e.target.value })}
          error={errors.password}
        />
        <Select
          options={options}
          onChange={(e) => setData({ ...data, role: e.value })}
        />
        <br />
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
