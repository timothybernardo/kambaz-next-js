const COURSES_API = `${process.env.NEXT_PUBLIC_API_BASE}/api/courses`;
const USERS_API   = `${process.env.NEXT_PUBLIC_API_BASE}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;

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