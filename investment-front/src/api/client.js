// import axios from "axios";

// // Prefer env override; default to nginx proxy path so front-end always calls backend through /api.
// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
// const API_BASE_URL = "http://54.163.92.239:5000"; 

// const client = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default client;


import axios from "axios";

const client = axios.create({
  baseURL: "http://54.163.92.239:5000",
  headers: { "Content-Type": "application/json" }
});

export default client;

