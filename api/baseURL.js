import axios from "axios";

const baseUrl = axios.create({
  baseURL: 'http://13.125.217.2:8080',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export default baseUrl;