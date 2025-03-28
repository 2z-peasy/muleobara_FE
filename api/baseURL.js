import axios from "axios";

const baseUrl = axios.create({
  baseURL: 'http://43.201.113.167:8080',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export default baseUrl;