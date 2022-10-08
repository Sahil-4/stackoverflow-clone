import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./slice/questions";
import answerSlice from "./slice/answer";
import usersSlice from "./slice/users";
import authSlice from "./slice/auth";

export const store = configureStore({
  reducer: {
    questions: questionsSlice,
    answer: answerSlice,
    users: usersSlice,
    auth: authSlice,
  },
});
