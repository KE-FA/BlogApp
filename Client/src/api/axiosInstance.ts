import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogapp-hx7k.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
