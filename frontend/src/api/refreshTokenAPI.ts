import axios from "axios";
import { BASE_URL } from "../config/urls";

import { setCredentials } from "../features/auth/authSlice";
import store from "../app/store";


const refreshTokenAPI = async () => {
  const client = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, //or add axios.defaults.withCredentials = true in app.js or top of file//for any req setting or sending cookies
  });

  try {
    const {
      data: { accessToken },
    } = await client.get("/api/auth/refresh");

    
    store.dispatch(setCredentials(accessToken));

    return accessToken;
  } catch (error) {
    //navigate to login
    console.error("error");
    return null;
  }
};

export default refreshTokenAPI;
