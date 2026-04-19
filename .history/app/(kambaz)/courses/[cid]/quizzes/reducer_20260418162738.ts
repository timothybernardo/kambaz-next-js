import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "./types";

interface QuizzesState {
  quizzes: Quiz[];
}

const initialState: QuizzesState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes(state, { payload }: PayloadAction<Quiz[]>) {
      state.quizzes = payload;
    },
    addQuiz(state, { payload }: PayloadAction<Quiz>) {
      state.quizzes.push(payload);
    },
    updateQuiz(state, { payload }: PayloadAction<Quiz>) {
      const i = state.quizzes.findIndex(q => q._id === payload._id);
      if (i !== -1) state.quizzes[i] = payload;
    },
    deleteQuiz(state, { payload }: PayloadAction<string>) {
      state.quizzes = state.quizzes.filter(q => q._id !== payload);
    },
    togglePublish(state, { payload }: PayloadAction<string>) {
      const q = state.quizzes.find(q => q._id === payload);
      if (q) q.published = !q.published;
    },
  },
});

export const { setQuizzes, addQuiz, updateQuiz, deleteQuiz, togglePublish } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;