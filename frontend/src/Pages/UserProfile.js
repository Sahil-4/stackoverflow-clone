import React from "react";
import Sidebar from "../Components/Sidebar";
import UserImage from "../assets/user.png";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <div className="main container user-profile-page">
      <Sidebar />

      <div className="user-profile-container">
        <div className="user-profile">
          <div className="user-profile-image-container">
            <img src={UserImage} alt="" />
          </div>
          <div className="user-profile-name">
            <h3>Alpha</h3>
            <p>Joined on September 27, 2022</p>
          </div>
          <div>
            <Link to="/profile?edit">
              <span className="button edit-profile-btn">Edit Profile</span>
            </Link>
          </div>
        </div>

        <div className="user-profile-summary">
          <div className="user-profile-watched-tags-container">
            <h4>Watched Tags</h4>
            <p>
              <span>Java</span>
              <span>C</span>
              <span>Python</span>
              <span>Go-Lang</span>
              <span>JavaScript</span>
            </p>
          </div>
          <div className="user-about-container">
            <h4>About</h4>
            <p>Fullstack Web Developer</p>
          </div>
        </div>

        <div className="edit-user-profile-summary hidden">
          <h3>Edit your profile</h3>
          <hr />
          <div className="summary-form-container">
            <h3>Public Information</h3>
            <form>
              <span>
                <label htmlFor="name">Display Name</label>
                <input type="text" value="" />
              </span>
              <span>
                <label htmlFor="name">About</label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
              </span>
              <span>
                <label htmlFor="name">Watched Tags</label>
                <p>Add tags seperated by 1 space</p>
                <input type="text" value="" />
              </span>
              <button>Save profile</button>
              <button>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
