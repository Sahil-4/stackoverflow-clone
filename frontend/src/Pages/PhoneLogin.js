import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../assets/icon.png";
import { getOTP, loginPhone } from "../redux/slice/auth";
import PhoneInput from "react-phone-number-input";

const PhoneLogin = () => {
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState({ phone: "", otp: "" });
  const [confirmationResult, setConfirmationResult] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);

  const handleGetOTP = () => {
    document.getElementById("recaptcha-container").innerHTML = "";
    setFlag(false);
    setData({ ...data, otp: "" });
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
          <span className="phone-number-container">
            <label htmlFor="phone">Phone Number</label>
            <PhoneInput
              defaultCountry="IN"
              name="phone"
              value={data.phone}
              onChange={(value) => {
                setData({ ...data, phone: value });
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
                setData({ ...data, otp: e.target.value });
              }}
            />
          </span>
          <button className={`button ${flag ? "" : "hidden"}`} type="submit">
            Login
          </button>
          <button
            className={`${flag ? "" : "hidden"}`}
            type="button"
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
