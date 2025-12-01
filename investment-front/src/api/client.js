import axios from "axios";

// Prefer env override; fall back to same host on port 5000 so prod build hits the deployed backend.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  `${window.location.protocol}//${window.location.hostname}:5000`;

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
