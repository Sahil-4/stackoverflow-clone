import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../assets/icon.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slice/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);

  const [auth, setAuth] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userProfile?.authtoken) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      navigate("/");
    }
    return () => {};
  }, [navigate, userProfile]);

  return (
    <div className="main signup-page">
      <div className="form-container login-form-container">
        <div>
          <img src={Icon} alt="stackoverflow" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(login(auth, navigate));
          }}
        >
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
            <div className="password-options">
              <label htmlFor="password">Password</label>
              <label>
                <Link to="/help">Forgot Password</Link>
              </label>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </span>
          <button type="submit" className="button">
            Login
          </button>
        </form>
        <p>
          Dont have an account? &nbsp;
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
