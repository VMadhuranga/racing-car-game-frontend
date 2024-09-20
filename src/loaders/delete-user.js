import axios from "axios";
import setAuthHeader from "../utils/set-auth-header";

export default async function deleteUser(baseUrl, userId) {
  await axios.delete(`${baseUrl}/users/${userId}`, {
    ...setAuthHeader(),
    withCredentials: true,
  });
}
