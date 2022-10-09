import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../redux/slice/auth";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userProfile);

  const [auth, setAuth] = useState({ username: "", email: "", password: "" });

  const handleOnChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user?.authtoken) {
      localStorage.setItem("userProfile", JSON.stringify(user));
      navigate("/");
    }
    return () => {};
  }, [navigate, user]);

  return (
    <div className="main signup-page">
      <div className="signup-div-l">
        <h3>Join the Stack Overflow community</h3>
        <div>
          <p>Get unstuck — ask a question</p>
          <p>Unlock new privileges like voting and commenting</p>
          <p>Save your favorite tags, filters, and jobs</p>
          <p>Earn reputation and badges</p>
          <p>Collaborate and share knowledge with a private group for</p>
          <p>
            <Link to="/teams">
              Get Stack Overflow for Teams free for up to 50 users.
            </Link>
          </p>
        </div>
      </div>

      <div className="form-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(signup(auth));
          }}
        >
          <span>
            <label htmlFor="username">Display Name</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </span>
          <span>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </span>
          <span>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </span>
          <p>
            Passwords must contain at least eight characters, including at least
            1 letter and 1 number.
          </p>
          <div className="checkbox-container">
            <input type="checkbox" name="opt-in" id="opt" />
            <span>
              Opt-in to receive occasional, product updates, user research
              invitations, company announcements, and digests.
            </span>
          </div>
          <button type="submit" className="button">
            Sign Up
          </button>
          <p>
            By clicking “Sign up”, you agree to our terms of service, privacy
            policy and cookie policy
          </p>
        </form>
        <p>
          Already have an account? &nbsp;
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
