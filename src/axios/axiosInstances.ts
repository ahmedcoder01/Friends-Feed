import axios from "axios";

export const authInstance = axios.create({
  baseURL: "https://friendsfeed.onrender.com/api/v1.0/auth",
  withCredentials: true,
});
export const usersInstance = axios.create({
  baseURL: "https://friendsfeed.onrender.com/api/v1.0/users",
  withCredentials: true,
});
export const globalInstance = axios.create({
  baseURL: "https://friendsfeed.onrender.com/api/v1.0/",
  withCredentials: true,
});
