import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./reduxexamples/helloredux/helloreducer";
import counterReducer from "./reduxexamples/counterredux/counterreducer";
const store = configureStore({
  reducer: { helloReducer, counterReducer }});
export type RootState = ReturnType<typeof store.getState>;
export default store;

