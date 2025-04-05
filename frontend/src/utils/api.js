import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4200/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Ensures cookies (including the token) are sent with requests
});

export default API;
