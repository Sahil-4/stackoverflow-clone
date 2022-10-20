import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import UserImage from "../assets/user.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/slice/users";

const Users = () => {
  const users = useSelector((state) => state.users);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userProfile) {
      dispatch(getAllUsers());
    }
    return () => {};
  }, [dispatch, userProfile]);

  const Profile = (props) => {
    return (
      <div className="profile-card">
        <div className="profile-image-container">
          <img src={UserImage} alt="user" />
        </div>
        <div className="info">
          <Link to={`/users/${props.user._id}`}>
            <h4>{props.user.username}</h4>
          </Link>
          <p>{props.user.about}</p>
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
          {userProfile &&
            users.users?.map((user) => {
              return <Profile key={user._id} user={user} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Users;
