import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postAnswer = createAsyncThunk(
  "postAnswer",
  async (answer_data) => {
    const response = await fetch(
      `http://localhost:5000/api/question/answer/${answer_data.quid}`,
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

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    isLoading: false,
    question_current: null,
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(postAnswer.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(postAnswer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.question_current = action.payload;
    });

    builder.addCase(postAnswer.rejected, (state, action) => {
      state.error = true;
      console.log(action.payload);
    });
  },
});

export default answerSlice.reducer;
