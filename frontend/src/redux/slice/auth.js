import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const Logout =
  ("logout",
  () => {
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
    builder.addCase(Logout.call, (state, action) => {
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
  },
});

export default authSlice.reducer;
