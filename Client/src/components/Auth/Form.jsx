import React from "react";
import { useParams } from "react-router-dom";
import Input from "../Generics/Input";
export default function Form({ handleFormSubmit, data, setData, errors }) {
  const { type } = useParams();
  return (
    <form onSubmit={handleFormSubmit} className="container">
      <Input
        error={errors.username}
        title="Username"
        id="username"
        value={data.username}
        handleChange={(e) => setData({ ...data, username: e.target.value })}
      />

      {type === "register" && (
        <Input
          error={errors.email}
          title="Email"
          id="email"
          value={data.email}
          handleChange={(e) => setData({ ...data, email: e.target.value })}
        />
      )}
      <Input
        error={errors.password}
        title="Password"
        id="password"
        value={data.password}
        handleChange={(e) => setData({ ...data, password: e.target.value })}
        type="password"
      />
      <button type="submit" className="btn btn-primary">
        {type === "register" ? "Register" : "Login"}
      </button>
    </form>
  );
}
