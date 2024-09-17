import axios from "axios";

export default async function getUser(baseUrl, userId) {
  try {
    const response = await axios.get(`${baseUrl}/users/${userId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
