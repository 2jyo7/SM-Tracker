import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4200/api", // Update with your backend URL if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to requests (for authentication)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
