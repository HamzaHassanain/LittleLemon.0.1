import React from "react";
import { Link } from "react-router-dom";
export default function PageHeader({ title }) {
  return (
    <div className="staff-page-header">
      <h1>{title}</h1>
      {title === "Orders" ? (
        <></>
      ) : (
        <Link to="new" className="btn">
          New
        </Link>
      )}
    </div>
  );
}
