import axios from "axios";

const API_URL = "http://localhost:5003"; // Your backend URL

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// User Authentication API Calls
export const registerUser = (userData) => api.post("/register", userData);
export const loginUser = (userData) => api.post("/login", userData);

// Item API Calls
export const fetchItems = () => api.get("/items");
export const uploadItem = (formData) => api.post("/upload", formData);

