import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { AuthContext } from "context/authContext";
import { UsersContext } from "context/usersContext";

import "./NavBar.css";

const titleStyle = {
  fontWeight: "bold",
};

const NavBar = () => {
  const { getIsAuthenticated, logoutUser } = useContext(AuthContext);
  const { title } = useContext(UsersContext);

  let menu = (
    <div className="navbar-menu">
      <div className="navbar-start">
        <Link to="/about" className="navbar-item" data-testid="nav-about">
          About
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/register" className="navbar-item" data-testid="nav-register">
          Register
        </Link>
        <Link to="/login" className="navbar-item" data-testid="nav-login">
          Log In
        </Link>
      </div>
    </div>
  );
  if (getIsAuthenticated()) {
    menu = (
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/about" className="navbar-item" data-testid="nav-about">
            About
          </Link>
          <Link to="/status" className="navbar-item" data-testid="nav-status">
            User Status
          </Link>
        </div>
        <div className="navbar-end">
          <span
            // eslint-disable-next-line react/jsx-handler-names
            onClick={logoutUser}
            className="navbar-item link"
            data-testid="nav-logout"
          >
            Log Out
          </span>
        </div>
      </div>
    );
  }
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <section className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item nav-title" style={titleStyle}>
            {title}
          </Link>
          <span
            className="nav-toggle navbar-burger"
            onClick={() => {
              let toggle = document.querySelector(".nav-toggle");
              let menu = document.querySelector(".navbar-menu");
              toggle.classList.toggle("is-active");
              menu.classList.toggle("is-active");
            }}
          >
            <span />
            <span />
            <span />
          </span>
        </div>
        {menu}
      </section>
    </nav>
  );
};

export default NavBar;
