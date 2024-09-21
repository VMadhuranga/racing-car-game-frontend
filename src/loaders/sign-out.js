import axios from "axios";
import removeAccessToken from "../utils/remove-access-token";

export default async function signOut(baseUrl) {
  await axios.get(`${baseUrl}/sign-out`, { withCredentials: true });
  removeAccessToken();
}
