import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://stackoverflow-clone-api-sahil-4.onrender.com";

export const handleChat = createAsyncThunk("handlechat", async (msg) => {
  const response = await fetch(`${BASE_URL}/api/chatbot/query`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: msg.message,
    }),
  });

  const data = await response.json();
  if (response.status === 200) {
    return data;
  }

  return {
    message: "Something went wrong\nPlease try again later.",
    author: false,
  };
});

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isLoading: false,
    messages: [
      { message: "Hii", author: false },
      { message: "How can i help you?", author: false },
    ],
    error: false,
  },

  reducers: {
    addChat: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(handleChat.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(handleChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = [...state.messages, action.payload];
    });

    builder.addCase(handleChat.rejected, (state, action) => {
      state.error = true;
      console.log(action.payload);
    });
  },
});

export const { addChat } = chatSlice.actions;
export default chatSlice.reducer;
