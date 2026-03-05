import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "
./courses/reducer";
const store = configureStore({
reducer: { coursesReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;