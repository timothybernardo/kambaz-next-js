import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../reduxexamples/helloredux/helloReducer";
const store = configureStore({
  reducer: { helloReducer }});
export type RootState = ReturnType<typeof store.getState>;
export default store;

