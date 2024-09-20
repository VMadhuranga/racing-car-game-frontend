import axios from "axios";
import setAuthHeader from "../utils/set-auth-header";

export default async function updatePassword(baseUrl, userId, formData) {
  try {
    await axios.patch(`${baseUrl}/users/${userId}/password`, formData, {
      ...setAuthHeader(),
      withCredentials: true,
    });
  } catch (error) {
    return error.response.data.errors;
  }
}
