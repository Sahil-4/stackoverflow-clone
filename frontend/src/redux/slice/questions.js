import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://stackoverflow-clone-api-sahil-4.onrender.com";

export const fetchAllQuestions = createAsyncThunk(
  "fetchAllQuestions",
  async () => {
    const response = await fetch(`${BASE_URL}/api/question/questions`, {
      method: "get",
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    }

    return data.error;
  }
);

export const postNewQuestions = createAsyncThunk(
  "postNewQuestions",
  async (question_body) => {
    const response = await fetch(`${BASE_URL}/api/question/ask`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        authtoken: JSON.parse(localStorage.getItem("userProfile")).authtoken,
      },
      body: JSON.stringify(question_body),
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    }

    return data.error;
  }
);

export const deleteQuestion = createAsyncThunk(
  "deleteQuestion",
  async (quid) => {
    const response = await fetch(`${BASE_URL}/api/question//delete/${quid}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        authtoken: JSON.parse(localStorage.getItem("userProfile")).authtoken,
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      return data;
    }

    return data.error;
  }
);

export const voteQuestion = createAsyncThunk("voteQuestion", async (quid) => {
  const response = await fetch(`${BASE_URL}/api/question/vote/${quid}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      authtoken: JSON.parse(localStorage.getItem("userProfile")).authtoken,
    },
  });

  const data = await response.json();

  if (response.status === 200) {
    return data;
  }

  return data.error;
});

export const postAnswer = createAsyncThunk(
  "postAnswer",
  async (answer_data) => {
    const response = await fetch(
      `${BASE_URL}/api/question/answer/${answer_data.quid}`,
      {
        method: "put",
        headers: {
          "Content-type": "application/json",
          authtoken: JSON.parse(localStorage.getItem("userProfile")).authtoken,
        },
        body: JSON.stringify(answer_data.answer),
      }
    );

    const data = await response.json();
    if (response.status === 200) {
      return data;
    }

    return data.error;
  }
);

export const deleteAnswer = createAsyncThunk("deleteAnswer", async (answer) => {
  const response = await fetch(
    `${BASE_URL}/api/question/delete/${answer.quid}/${answer.auid}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authtoken: JSON.parse(localStorage.getItem("userProfile")).authtoken,
      },
    }
  );

  const data = await response.json();
  if (response.status === 200) {
    return data;
  }

  return data.error;
});

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    isLoading: false,
    question_list: null,
    question_current: null,
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllQuestions.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.question_list = action.payload;
    });

    builder.addCase(fetchAllQuestions.rejected, (state, action) => {
      state.error = true;
      console.log(action.payload);
    });

    builder.addCase(postNewQuestions.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(postNewQuestions.fulfilled, (state, action) => {
      const ls = state.question_list;
      state.isLoading = false;
      state.question_list = [...ls, action.payload];
    });

    builder.addCase(postNewQuestions.rejected, (state, action) => {
      state.error = true;
      console.log(action.payload);
    });

    builder.addCase(deleteQuestion.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      const ls = state.question_list.forEach((question) => {
        if (question._id !== action.payload._id) {
          return question;
        }
      });
      state.isLoading = false;
      state.question_list = ls;
    });

    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.error = true;
      console.log(action.payload);
    });

    builder.addCase(voteQuestion.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(voteQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      let ls = state.question_list.forEach((question) => {
        if (question._id !== action.payload._id) {
          return question;
        }
        return action.payload;
      });
      state.question_list = ls;
    });

    builder.addCase(voteQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      console.log(action.payload);
    });

    builder.addCase(postAnswer.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(postAnswer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.question_current = action.payload;
      let ls = state.question_list.forEach((question) => {
        if (question._id !== action.payload._id) {
          return question;
        }
        return action.payload;
      });
      state.question_list = ls;
    });

    builder.addCase(postAnswer.rejected, (state, action) => {
      state.error = true;
      console.log(action.payload);
    });

    builder.addCase(deleteAnswer.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(deleteAnswer.fulfilled, (state, action) => {
      state.isLoading = false;
      let ls = state.question_list.forEach((question) => {
        if (question._id !== action.payload._id) {
          return question;
        }
        return action.payload;
      });
      state.question_list = ls;
    });

    builder.addCase(deleteAnswer.rejected, (state, action) => {
      state.error = true;
      console.log(action.payload);
    });
  },
});

export default questionsSlice.reducer;
