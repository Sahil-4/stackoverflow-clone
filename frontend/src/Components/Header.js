import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Search from "../assets/search-solid.svg";
import { Logout } from "../redux/slice/auth";

const Header = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);

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

      <div className="profile-preview-container">
        {userProfile?.username ? (
          <>
            <Link to={"/users/me"}>
              <span className="button profile-preview">
                {userProfile?.username[0]}
              </span>
            </Link>
            <Link
              onClick={() => {
                dispatch(Logout());
              }}
            >
              <span className="button">Log out</span>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <span className="button">Log in</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
