import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
courses: courses,
};
const coursesSlice = createSlice({
name: "courses"
,
initialState,
reducers: {
addNewCourse: (state, { payload: course }) => {
const newCourse = { ...course, _id: uuidv4() };
state.courses = [...state.courses, newCourse] as any;
},
deleteCourse: (state, { payload: courseId }) => {
state.courses = state.courses.filter(
(course: any) => course.
id !== courseId
_
);
},
updateCourse: (state, { payload: course }) => {
state.courses = state.courses.map((c: any) =>
c.
id === course.
id ? course : c
_
_
) as any;
},
setCourses: (state, { payload: courses }) => {
state.courses = courses;
},
},
});
export const { addNewCourse, deleteCourse, updateCourse } =
coursesSlice.actions;
export default coursesSlice.reducer;