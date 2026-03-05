import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./reduxexamples/helloredux/helloreducer";
import counterReducer from "./reduxexamples/counterredux/counterreducer";
import addReducer from "./reduxexamples/addredux/addreducer"
import todosReducer from ".//reduxexamples/"
const store = configureStore({
  reducer: { helloReducer, counterReducer, addReducer }});
export type RootState = ReturnType<typeof store.getState>;
export default store;

