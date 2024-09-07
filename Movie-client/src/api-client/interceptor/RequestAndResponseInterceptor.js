import axios from "axios";
import TokenService from "../token/tokenService";

const tokenService = new TokenService();

const axiosInstance = axios.create({
  baseURL: "http://localhost:8088/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Interceptor headers:", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
