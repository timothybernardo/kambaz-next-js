import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const USERS_API = "/api/users";

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses/${courseId}`);
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/current/courses/${courseId}`);
  return data;
};