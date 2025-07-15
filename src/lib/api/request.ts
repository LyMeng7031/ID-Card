import { CookieName } from "@/types/cookie-enum";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/app/store/auth-store";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Retry queue and refresh control
interface RetryQueueItem {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const originalConfig: AxiosRequestConfig = error.config;

    // Handle Unauthorized (401)
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
            {},
            { withCredentials: true }
          );

          const { accessToken } = response.data;

          // Save new access token
          Cookies.set(CookieName.ACCESS_TOKEN, accessToken);
          useAuthStore.getState().setAccessToken(accessToken);

          // Update the failed request with new token
          originalConfig.headers = {
            ...originalConfig.headers,
            Authorization: `Bearer ${accessToken}`,
          };

          // Retry queued requests
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            axiosInstance
              .request(config)
              .then(resolve)
              .catch(reject);
          });

          refreshAndRetryQueue.length = 0;

          return axiosInstance(originalConfig);
        } catch (refreshError: any) {
          console.log("Refresh token failed:", refreshError);
          useAuthStore.getState().logout();
          return Promise.reject(refreshError.response?.data || refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Queue the failed request while token is refreshing
      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalConfig, resolve, reject });
      });
    }

    // Forbidden (403) — logout user
    if (error.response && error.response.status === 403) {
      console.warn("Access forbidden. Logging out.");
      useAuthStore.getState().logout();
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;
