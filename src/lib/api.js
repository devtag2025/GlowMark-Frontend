import axios from "axios";

const api_base_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: api_base_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
