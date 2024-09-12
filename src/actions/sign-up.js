import axios from "axios";

export default async function signUp(baseUrl, formData) {
  try {
    await axios.post(`${baseUrl}/users`, formData);
  } catch (error) {
    return error.response.data.errors;
  }
}
