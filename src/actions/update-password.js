import axios from "axios";

export default async function updatePassword(baseUrl, userId, formData) {
  try {
    await axios.patch(`${baseUrl}/users/${userId}/password`, formData, {
      withCredentials: true,
    });
  } catch (error) {
    return error.response.data.errors;
  }
}
