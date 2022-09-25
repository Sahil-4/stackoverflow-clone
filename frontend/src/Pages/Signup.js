import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
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
        <form action="/">
          <span>
            <label htmlFor="username">Display Name</label>
            <input type="text" id="username" name="username" />
          </span>
          <span>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </span>
          <span>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
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
          <button type="submit">Sign Up</button>
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
