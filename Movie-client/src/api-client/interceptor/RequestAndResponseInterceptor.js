import axios from "axios";
import TokenService from "../token/tokenService";

const tokenService = new TokenService();

const axiosInstance = axios.create({
  baseURL: "http://localhost:8088/api/v1",
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.token;
    console.log("da token in RequestAndResponse is : ",token)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Request intercepted:", config.url);
    console.log("Authorization header:", config.headers["Authorization"]);

    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
