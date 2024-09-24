import axios from "axios";
import setAuthHeader from "../utils/set-auth-header";

export default async function updateBestTime(baseUrl, userId, formData) {
  axios.patch(`${baseUrl}/users/${userId}/leader-board/best-time`, formData, {
    ...setAuthHeader(),
    withCredentials: true,
  });
}
