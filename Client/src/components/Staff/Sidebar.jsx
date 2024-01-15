import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ links }) {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        {links.map((link) => (
          <li className="sidebar-list-item" key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-list-item-link active"
                  : "sidebar-list-item-link"
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
