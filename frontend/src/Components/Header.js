import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Search from "../assets/search-solid.svg";

const Header = () => {
  return (
    <header className="header-top">
      <div className="logo-container">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>
      </div>

      <nav className="navbar-top">
        <Link to="/">
          <span>About</span>
        </Link>
        <Link to="/">
          <span>Products</span>
        </Link>
        <Link to="/">
          <span>For Teams</span>
        </Link>
      </nav>

      <div className="search-box-container">
        <img src={Search} alt="search" />
        <input type="text" placeholder="Search" />
      </div>

      <Link to="/login">
        <span className="login-button">Log In</span>
      </Link>
    </header>
  );
};

export default Header;
