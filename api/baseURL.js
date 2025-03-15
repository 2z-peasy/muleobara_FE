import axios from "axios";

const baseUrl = axios.create({
  baseURL: 'http://52.79.42.211:8080',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export default baseUrl;