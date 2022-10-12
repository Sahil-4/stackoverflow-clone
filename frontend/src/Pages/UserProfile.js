import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import UserImage from "../assets/user.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../redux/slice/users";
import { updateUserProfile } from "../redux/slice/auth";
import moment from "moment";

const UserProfile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({});
  const [newProfile, setNewProfile] = useState({
    username: "",
    about: "",
    watched_tags: [],
    password: "",
  });

  const userProfile = useSelector((state) => state.auth.userProfile);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(getAllUsers());
    }
    return () => {};
  }, [dispatch, users]);

  useEffect(() => {
    if (!userProfile) {
      navigate("/login");
      return;
    }

    if (params.uid === "me" || params.uid === userProfile?.uid) {
      setProfile(userProfile);
    } else {
      users?.forEach((user) => {
        if (user._id === params.uid) {
          setProfile(user);
          return;
        }
      });
    }
    return () => {};
  }, [navigate, params.uid, userProfile, users]);

  // get user location
  const [myLocation, setMyLocation] = useState("");

  useEffect(() => {
    return () => {
      window.navigator.geolocation.getCurrentPosition(
        async (position) => {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=46a8fa9117d14f56afc13ce3f0272b75`,
            {
              method: "get",
            }
          );

          const data = await response.json();
          setMyLocation(
            `${data.results[0].components.city}, ${data.results[0].components.state}, ${data.results[0].components.country}`
          );
        },

        (err) => {
          console.log(err);
          // if user deneid geo location
          // get location using ip address
        },
        { timeout: 60000, enableHighAccuracy: true }
      );
    };
  }, []);

  return (
    <div className="main container user-profile-page">
      <Sidebar />

      <div className="user-profile-container">
        <div className="user-profile">
          <div className="user-profile-image-container">
            <img src={UserImage} alt="" />
          </div>
          <div className="user-profile-name">
            <h3>{profile.username}</h3>
            <p>{moment(profile.timestamp).fromNow()}</p>
            <p>{myLocation}</p>;
          </div>
          <div>
            {(params.uid === "me" || params.uid === userProfile?.uid) && (
              <Link
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                <span className="button edit-profile-btn">Edit Profile</span>
              </Link>
            )}
          </div>
        </div>

        <div className={`user-profile-summary ${editMode ? "hidden" : ""}`}>
          <div className="user-profile-watched-tags-container">
            <h4>Watched Tags</h4>
            <p>
              {profile.watched_tags?.map((tags, index) => {
                return <span key={index}>{tags}</span>;
              })}
            </p>
          </div>
          <div className="user-about-container">
            <h4>About</h4>
            <p>{profile.about}</p>
          </div>
        </div>

        <div
          className={`edit-user-profile-summary ${editMode ? "" : "hidden"}`}
        >
          <h3>Edit your profile</h3>
          <hr />
          <div className="summary-form-container">
            <h3>Public Information</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditMode(!editMode);
                dispatch(updateUserProfile(newProfile));
              }}
            >
              <span>
                <label htmlFor="username">Display Name</label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  value={newProfile.username}
                  onChange={(e) => {
                    setNewProfile({
                      ...newProfile,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </span>
              <span>
                <label htmlFor="about">About</label>
                <textarea
                  name="about"
                  id="about"
                  cols="30"
                  rows="10"
                  value={newProfile.about}
                  onChange={(e) => {
                    setNewProfile({
                      ...newProfile,
                      [e.target.name]: e.target.value,
                    });
                  }}
                ></textarea>
              </span>
              <span>
                <label htmlFor="watched_tags">Watched Tags</label>
                <p>Add tags seperated by 1 comma</p>
                <input
                  name="watched_tags"
                  type="text"
                  value={newProfile.watched_tags}
                  onChange={(e) => {
                    setNewProfile({
                      ...newProfile,
                      [e.target.name]: e.target.value.split(","),
                    });
                  }}
                />
              </span>
              <span>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={newProfile.password}
                  onChange={(e) => {
                    setNewProfile({
                      ...newProfile,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </span>
              <button type="submit">Save profile</button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
