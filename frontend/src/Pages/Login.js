import React from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/icon.png";

const Login = () => {
  return (
    <div className="main signup-page">
      <div className="form-container login-form-container">
        <div>
          <img src={Icon} alt="stackoverflow" />
        </div>
        <form action="/">
          <span>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </span>
          <span>
            <div className="password-options">
              <label htmlFor="password">Password</label>
              <label>
                <Link to="/help">Forgot Password</Link>
              </label>
            </div>
            <input type="password" id="password" name="password" />
          </span>
          <button type="submit">Login</button>
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
