import axios from "axios";
import setAuthHeader from "../utils/set-auth-header";

export default async function updateUsername(baseUrl, userId, formData) {
  try {
    await axios.patch(`${baseUrl}/users/${userId}/username`, formData, {
      ...setAuthHeader(),
      withCredentials: true,
    });
  } catch (error) {
    return error.response.data.errors;
  }
}
