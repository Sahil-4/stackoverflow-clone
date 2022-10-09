import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://stackoverflow-clone-api-sahil-4.onrender.com";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await fetch(`${BASE_URL}/api/user/getusers`, {
    method: "get",
    headers: {
      authtoken: JSON.parse(localStorage.getItem("userProfile")).authtoken,
    },
  });

  const data = await response.json();
  if (response.status === 200) {
    return data; // array of users
  }

  return data.error;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: null,
    error: false,
  },

  // get all users
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = true;
      console.log(action.payload);
    });
  },
});

export default usersSlice.reducer;
