import axios from "axios";
import { decodeJwt } from "jose";
import setAccessToken from "../utils/set-access-token";
import getAccessToken from "../utils/get-access-token";

export default async function refresh(baseUrl) {
  const token = getAccessToken();

  if (!token || decodeJwt(token).exp < Date.now()) {
    const response = await axios.get(`${baseUrl}/refresh`, {
      withCredentials: true,
    });

    const { accessToken, userId } = response.data;
    setAccessToken(accessToken);
    return userId;
  }
}
