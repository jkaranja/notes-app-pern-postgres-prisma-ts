import axios from "axios";
import { BASE_URL } from "../config/urls";

import refreshTokenAPI from "./refreshTokenAPI";

interface AxiosPrivateParams {
  token?: string;
  contentType?: string;
  cookie?: boolean;
}
//requestIntercept
const axiosPrivate = ({
  token,
  contentType = "application/json",
  cookie = false,
}: AxiosPrivateParams) => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": contentType, //default
    },
    withCredentials: cookie,
  });

  //intercept req and inject token in header
  API.interceptors.request.use(
    (req) => {
      if (!req.headers.Authorization) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    },
    (error) => Promise.reject(error)
  );

  //intercept response if err, request new accessToken and retry the initial req with new accessToken
  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;

        const newAccessToken = await refreshTokenAPI();

        prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return API;
};

export default axiosPrivate;
