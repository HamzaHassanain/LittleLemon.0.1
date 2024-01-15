import React from "react";

export default function Input({
  error,
  title,
  id,
  value,
  handleChange,
  type,
  className,
}) {
  return (
    <div className={"form-group " + className}>
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        className="form-control"
        placeholder={"Enter " + title}
        id={id}
        value={value}
        onChange={handleChange}
      />
      <p className="error"> {error} </p>
    </div>
  );
}
