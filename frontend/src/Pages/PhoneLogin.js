import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../assets/icon.png";
import { getOTP, loginPhone } from "../redux/slice/auth";

const PhoneLogin = () => {
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState({ phone: "", otp: "" });
  const [confirmationResult, setConfirmationResult] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);

  const handleGetOTP = () => {
    if (data.phone !== "") {
      dispatch(
        getOTP({
          ...data,
          setFlag: setFlag,
          setConfirmationResult: setConfirmationResult,
        })
      );
    } else {
      alert("please enter a valid phone number");
    }
  };

  const handleLogin = () => {
    if (data.otp !== "") {
      dispatch(
        loginPhone({
          ...data,
          confirmationResult: confirmationResult,
          navigate: navigate,
        })
      );
    } else {
      alert("please enter a valid phone number");
    }
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
        <h2>Login with Phone</h2>
        <p></p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <span>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              required="True"
              value={data.phone}
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
              }}
            />
          </span>
          <button
            type="button"
            className={`button ${flag ? "hidden" : ""}`}
            onClick={() => {
              handleGetOTP();
            }}
          >
            Get OTP
          </button>
          <div id="recaptcha-container" />
          <span className={`${flag ? "" : "hidden"}`}>
            <label htmlFor="otp">Enter your OTP</label>
            <input
              type="otp"
              id="otp"
              name="otp"
              value={data.otp}
              required="True"
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
              }}
            />
          </span>
          <button className={`button ${flag ? "" : "hidden"}`} type="submit">
            Login
          </button>
          <button
            className={`${flag ? "" : "hidden"}`}
            onClick={() => {
              handleGetOTP();
            }}
          >
            Resend OTP
          </button>
        </form>
        <p></p>
        <div>
          <Link to="/login">
            <span className="button">Sign in with Email and Password</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PhoneLogin;
