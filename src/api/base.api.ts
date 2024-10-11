import { refreshToken } from "@/commons/refreshToken";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("First resquest");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        console.log("First refresh");
        await refreshToken();
        
        const newToken = localStorage.getItem("token");
        
        error.config.headers.Authorization = `Bearer ${newToken}`;
        
        return axiosClient(error.config);
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
