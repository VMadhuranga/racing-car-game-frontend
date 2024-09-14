import axios from "axios";
import setAccessToken from "../utils/set-access-token";

export default async function signIn(baseUrl, formData) {
  try {
    const response = await axios.post(`${baseUrl}/sign-in`, formData, {
      withCredentials: true,
    });

    const { userId, accessToken } = response.data;
    setAccessToken(accessToken);
    return { userId };
  } catch (error) {
    return { errors: error.response.data.errors };
  }
}
