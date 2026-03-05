import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./reduxexamples/helloredux/helloreducer";
const store = configureStore({
  reducer: { helloReducer }});
export type RootState = ReturnType<typeof store.getState>;
export default store;

