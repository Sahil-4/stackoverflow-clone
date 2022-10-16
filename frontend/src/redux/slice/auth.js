import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/firebase_config";

const BASE_URL = "https://stackoverflow-clone-api-sahil-4.onrender.com";

export const signup = createAsyncThunk("signup", async (auth_data) => {
  if (localStorage.getItem("userProfile")) {
    return { userProfile: JSON.parse(localStorage.getItem("userProfile")) };
  }

  const response = await fetch(`${BASE_URL}/api/user/signup`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(auth_data),
  });

  const data = await response.json();

  if (response.status === 200) {
    return data;
  }

  alert(data.error);
  return data.error;
});

export const login = createAsyncThunk("login", async (auth_data) => {
  if (localStorage.getItem("userProfile")) {
    return { userProfile: JSON.parse(localStorage.getItem("userProfile")) };
  }

  const response = await fetch(`${BASE_URL}/api/user/login`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(auth_data),
  });

  const data = await response.json();

  if (response.status === 200) {
    return data;
  }

  alert(data.error);
  return data.error;
});

export const Logout = createAsyncThunk("logout", () => {
  localStorage.removeItem("userProfile");
});

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (user_data) => {
    const response = await fetch(
      `${BASE_URL}/api/user/updateuser/${
        JSON.parse(localStorage.getItem("userProfile")).uid
      }`,
      {
        method: "put",
        headers: {
          "Content-type": "application/json",
          authtoken: JSON.parse(localStorage.getItem("userProfile")).authtoken,
        },
        body: JSON.stringify(user_data),
      }
    );

    const data = await response.json();
    if (response.status === 200) {
      return data;
    }

    return data.error;
  }
);

export const getOTP = createAsyncThunk("getOTP", async (data) => {
  // set up reCaptcha
  const recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "normal",
      callback: (response) => {
        data.setFlag(true);
      },
    },
    auth
  );
  recaptchaVerifier.render();

  // send otp
  const response = await signInWithPhoneNumber(
    auth,
    data.phone,
    recaptchaVerifier
  );
  data.setConfirmationResult(response);
});

export const loginPhone = createAsyncThunk("loginPhone", async (auth_data) => {
  try {
    await auth_data.confirmationResult.confirm(auth_data.otp);
    const response = await fetch(`${BASE_URL}/api/user/phonelogin`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ phone: auth_data.phone }),
    });

    const data = response.json();
    if (response.status === 200) {
      return data;
    }

    return data.error;
  } catch (err) {
    console.log(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    userProfile: JSON.parse(localStorage.getItem("userProfile")),
    error: false,
  },

  extraReducers: (builder) => {
    // for login ----------------------------------------------------------
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload.userProfile;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.error = true;
      console.log(action.payload);
    });

    // for signup ----------------------------------------------------------
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload.userProfile;
    });

    builder.addCase(signup.rejected, (state, action) => {
      state.error = true;
      console.log(action.payload);
    });

    // for logout ---------------------------------------------------------
    builder.addCase(Logout.fulfilled, (state, action) => {
      state.userProfile = null;
    });

    // for updating user profile
    builder.addCase(updateUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload.userProfile;
      localStorage.setItem(
        "userProfile",
        JSON.stringify(action.payload.userProfile)
      );
    });

    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      console.log(action.payload);
    });

    // sending otp
    builder.addCase(getOTP.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    builder.addCase(getOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      console.log(action.payload);
    });

    // login using phone and otp
    builder.addCase(loginPhone.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loginPhone.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload.userProfile;
    });

    builder.addCase(loginPhone.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      console.log(action.payload);
    });
  },
});

export default authSlice.reducer;
