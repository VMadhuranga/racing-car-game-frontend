import axios from "axios";
import { decodeJwt } from "jose";
import setAccessToken from "../utils/set-access-token";
import getAccessToken from "../utils/get-access-token";

export default async function refresh(baseUrl) {
  try {
    const accessToken = getAccessToken();

    if (!accessToken || decodeJwt(accessToken).exp < Date.now()) {
      const response = await axios.get(`${baseUrl}/refresh`, {
        withCredentials: true,
      });

      const { accessToken, userId } = response.data;
      setAccessToken(accessToken);
      return userId;
    }
  } catch {
    return null;
  }
}
