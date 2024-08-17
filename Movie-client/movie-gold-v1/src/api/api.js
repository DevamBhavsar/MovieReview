import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const AUTH_URL = `${BASE_URL}/auth`;
const MOVIES_URL = `${BASE_URL}/v1/movies`;

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
      console.log("Added token to request:", config.headers['Authorization']);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access, redirecting to login");
      localStorage.removeItem('jwtToken');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export const isLoggedIn = () => {
  const token = localStorage.getItem('jwtToken');
  console.log("Checking login status, token exists:", !!token);
  return !!localStorage.getItem('jwtToken');
};

export const registerUser = async (userData) => {
  const response = await api.post(`${AUTH_URL}/signup`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post(`${AUTH_URL}/login`, userData);
  if (response.data.accessToken) {
    localStorage.setItem('jwtToken', response.data.accessToken);
    console.log("Token stored:", localStorage.getItem('jwtToken'));
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('jwtToken');
};

export const getAllMovies = async () => {
  const response = await api.get(MOVIES_URL);
  return response.data;
};

export const updateMovie = async (movieData) => {
  try {
    const response = await api.put(`${MOVIES_URL}/${movieData.imdbId}`, movieData);
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

export const createMovie = async (movieData) => {
  try {
    const response = await api.post(MOVIES_URL, movieData);
    return response.data;
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
};

export default api;
