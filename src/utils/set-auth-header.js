import getAccessToken from "./get-access-token";

export default function setAuthHeader() {
  return {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
}
