import React from "react";
import logo from "../../imgs/LittleLemonLogo1.png";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
export default function Header() {
  const { user } = useUser();
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <nav className="container">
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Menu
            </NavLink>
          </li>
          {user.token ? (
            <React.Fragment>
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  User
                </NavLink>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="nav-item">
                <NavLink to="/auth/login" className="nav-link btn-login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/auth/register" className="nav-link btn-register">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
}
