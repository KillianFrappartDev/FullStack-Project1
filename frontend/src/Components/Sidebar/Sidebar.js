import React from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <nav className="sidebar">
      <NavLink to="/">
        <h1 className="sidebar__brand">Shop!</h1>
      </NavLink>
      <div className="sidebar__links">
        <NavLink className="sidebar__link" to="/auth">
          <span className="navbar__brand-icon">
            <i className="fas fa-sign-in-alt fa-3x"></i>
          </span>
        </NavLink>
        <NavLink className="sidebar__link" to="/profile/info">
          <span className="navbar__brand-icon">
            <i className="fas fa-user-alt fa-3x"></i>
          </span>
        </NavLink>
        <NavLink className="sidebar__link" to="/profile/products">
          <span className="navbar__brand-icon">
            <i className="fas fa-store fa-3x"></i>
          </span>
        </NavLink>
        <NavLink className="sidebar__link" to="/profile/orders">
          <span className="navbar__brand-icon">
            <i className="fas fa-money-check-alt fa-3x"></i>
          </span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
