import axios from "axios";
import setAuthHeader from "../utils/set-auth-header";

export default async function getUser(baseUrl, userId) {
  const response = await axios.get(`${baseUrl}/users/${userId}`, {
    ...setAuthHeader(),
    withCredentials: true,
  });

  return response.data;
}
