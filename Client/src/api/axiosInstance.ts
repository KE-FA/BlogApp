import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogapp-dgll.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
