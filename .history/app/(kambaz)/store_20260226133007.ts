import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courses/reducer";
import modulesReducer from "./courses/[cid]/modules/reducer";

const store = configureStore({
  reducer: { 
    coursesReducer,
    modulesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;