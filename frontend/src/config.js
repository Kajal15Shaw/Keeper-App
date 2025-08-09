// src/config.js
const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api" // when running locally
    : "https://keeper-app-3-khpc.onrender.com/api"; // Render backend in production

export default API_BASE_URL;
