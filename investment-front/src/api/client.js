import axios from "axios";

const client = axios.create({
  // baseURL: "http://54.163.92.239:5000",
  baseURL: "https://89g0gd9hml.execute-api.us-east-1.amazonaws.com",
  headers: { "Content-Type": "application/json" }
});

export default client;


