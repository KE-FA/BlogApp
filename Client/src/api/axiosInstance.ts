import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogapp-sa7q.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
