import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../Context/auth-context";
import "./Sidebar.css";

const Sidebar = (props) => {
  const authContext = useContext(AuthContext);

  const clickHandler = () => {
    authContext.logout();
  };

  let links;
  if (authContext.isLogged) {
    links = (
      <React.Fragment>
        <NavLink to="/">
          <h1 className="sidebar__brand">Shop!</h1>
        </NavLink>
        <div className="sidebar__links">
          <NavLink className="sidebar__link" to="/">
            <span className="navbar__brand-icon">
              <i className="fas fa-shopping-cart fa-3x"></i>
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
          <NavLink
            onClick={clickHandler}
            className="sidebar__link"
            to="/"
          >
            <span className="navbar__brand-icon">
              <i className="fas fa-sign-out-alt fa-3x"></i>
            </span>
          </NavLink>
        </div>
      </React.Fragment>
    );
  } else {
    links = (
      <React.Fragment>
        <NavLink to="/">
          <h1 className="sidebar__brand">Shop!</h1>
        </NavLink>
        <div className="sidebar__links">
          <NavLink className="sidebar__link" to="/auth">
            <span className="navbar__brand-icon">
              <i className="fas fa-user-alt fa-3x"></i>
            </span>
          </NavLink>
          <NavLink className="sidebar__link" to="/">
            <span className="navbar__brand-icon">
              <i className="fas fa-shopping-cart fa-3x"></i>
            </span>
          </NavLink>
        </div>
      </React.Fragment>
    );
  }

  return <nav className="sidebar">{links}</nav>;
};

export default Sidebar;
