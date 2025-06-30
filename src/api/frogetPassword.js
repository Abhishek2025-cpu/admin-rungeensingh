import axios from "axios";
import { BASE_URL } from "../base_url";

export const forgetPassword = async (email) => {
  try {
    const rs = await axios.post(
      BASE_URL + "/forgot-password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return rs.data;
  } catch (error) {
    console.log(error);
  }
};
