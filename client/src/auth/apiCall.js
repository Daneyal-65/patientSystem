import axios from "axios";
import { authApi } from "./config";

const signup = async (formData) => {
  try {
    const res = await axios.post(`${authApi}/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Signup successful", res.data);
    return res.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const login = async (formData) => {
  try {
    const res = await axios.post(`${authApi}/login`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Login successful", res.data);
    return res.data; // This should include the token if successful
  } catch (err) {
    // console.error(
    //   "Login failed",
    //   err.response ? err.response.data : err.message
    // );
    console.log(err);
    // return { message: err.response ? err.response.data : err.message };
  }
};
export { login, signup };
