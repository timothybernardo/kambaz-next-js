import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const COURSES_API     = `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/courses`;
const USERS_API       = `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/users`;
const MODULES_API     = `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/assignments`;

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};
export const findAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}`);
  return data;
};
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/modules`, module);
  return response.data;
};
export const deleteModule = async (moduleId: string) => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};
export const updateModule = async (module: any) => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};
export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return data;
};
export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};
export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};