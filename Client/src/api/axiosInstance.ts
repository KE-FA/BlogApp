import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogapp-nazq.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
