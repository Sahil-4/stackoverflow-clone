import React from "react";
import { Link, useLocation } from "react-router-dom";
import Globe from "../assets/Globe.svg";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar-left">
      <Link to="/">
        <span className={`${location.pathname === "/" ? "active" : ""}`}>
          Home
        </span>
      </Link>
      <span>Public</span>

      <ol>
        <Link to="/questions">
          <span
            className={`${
              location.pathname === "/questions" ? "active q-span" : "q-span"
            }`}
          >
            <img src={Globe} alt="questions" />
            Question
          </span>
        </Link>
        <Link to="/tags">
          <span className={`${location.pathname === "/tags" ? "active" : ""}`}>
            Tags
          </span>
        </Link>
        <Link to="/users">
          <span className={`${location.pathname === "/users" ? "active" : ""}`}>
            Users
          </span>
        </Link>
      </ol>
    </aside>
  );
};

export default Sidebar;
