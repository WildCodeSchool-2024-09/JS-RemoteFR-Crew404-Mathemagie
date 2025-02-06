import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3310", // Si je n'ai pas de .env, alors prend le localhost, sinon, prend import.meta.env.VITE_API_URL
  withCredentials: true,
});

export default api;
