import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const AUTH_URL = `${BASE_URL}/auth`;
const MOVIES_URL = `${BASE_URL}/v1/movies`;

export const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

export const setAuthHeader = (token) => {
  if (token !== null) {
      localStorage.setItem("jwtToken", token);
  } else {
      localStorage.removeItem("jwtToken");
  }
};
   const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);
export const request = (method, url, data) => {
  return api({
      method: method,
      url: url,
      data: data
  });
};

export const isLoggedIn = () => {
  const token = getAuthToken();
  return !!token;
};

export const registerUser = async (userData) => {
  const response = await request('post', `${AUTH_URL}/signup`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await request('post', `${AUTH_URL}/login`, userData);
  if (response.data.accessToken) {
      setAuthHeader(response.data.accessToken);
  }
  return response.data;
};

export const logoutUser = () => {
  setAuthHeader(null);
};

export const getAllMovies = async () => {
  const response = await request('get', MOVIES_URL);
  return response.data;
};

export const updateMovie = async (movieData) => {
  try {
      const response = await request('put', `${MOVIES_URL}/${movieData.imdbId}`, movieData);
      return response.data;
  } catch (error) {
      console.error("Error updating movie:", error);
      throw error;
  }
};

export const createMovie = async (movieData) => {
  try {
      const response = await request('post', MOVIES_URL, movieData);
      return response.data;
  } catch (error) {
      console.error("Error creating movie:", error);
      throw error;
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(`${AUTH_URL}/refreshtoken`, { refreshToken });
    const { accessToken } = response.data;
    setAuthHeader(accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const accessToken = await refreshToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export const getRoles = async () => {
  const response = await request('get', `${AUTH_URL}/roles`);
  return response.data;
};

export default api;



