import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./slice/questions";
import usersSlice from "./slice/users";
import authSlice from "./slice/auth";
import chatSlice from "./slice/chat";

export const store = configureStore({
  reducer: {
    questions: questionsSlice,
    users: usersSlice,
    auth: authSlice,
    chat: chatSlice,
  },
});
