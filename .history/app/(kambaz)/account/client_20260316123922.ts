import axios from "axios";
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const response = await axios.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

