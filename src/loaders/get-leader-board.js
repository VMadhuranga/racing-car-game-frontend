import axios from "axios";
import setAuthHeader from "../utils/set-auth-header";

export default async function getLeaderBoard(baseUrl, userId) {
  const response = await axios.get(`${baseUrl}/users/${userId}/leader-board`, {
    ...setAuthHeader(),
    withCredentials: true,
  });

  return response.data;
}
