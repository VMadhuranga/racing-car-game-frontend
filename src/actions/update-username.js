import axios from "axios";

export default async function updateUsername(baseUrl, userId, formData) {
  try {
    await axios.patch(`${baseUrl}/users/${userId}/username`, formData, {
      withCredentials: true,
    });
  } catch (error) {
    return error.response.data.errors;
  }
}
