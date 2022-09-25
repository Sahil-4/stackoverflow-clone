import React from "react";
import Sidebar from "../Components/Sidebar";
import UserImage from "../assets/user.png";
import { Link } from "react-router-dom";

const Users = () => {
  const Profile = () => {
    return (
      <div className="profile-card">
        <div className="profile-image-container">
          <img src={UserImage} alt="user" />
        </div>
        <div className="info">
          <Link to="users/Alpha">
            <h4>Alpha</h4>
          </Link>
          <p>Python Lover</p>
        </div>
      </div>
    );
  };

  return (
    <div className="main container">
      <Sidebar />
      <div className="users-profile-container">
        <h1>All Users</h1>
        <div className="all-profiles">
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Users;
