import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const ENROLLMENTS_API = `${process.env.NEXT_PUBLIC_API_BASE}/api/enrollments`;

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${courseId}`);
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${courseId}`);
  return data;
};