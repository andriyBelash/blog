import axios, { type CreateAxiosDefaults } from "axios";
import AuthTokenService from "@/src/services/auth/auth-token.service";
import AuthService from "@/src/services/auth/auth.service";
import { redirect } from "next/navigation";

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api/web/',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
}

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = AuthTokenService.getAccessToken();

  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 && error.response?._data?.message === 'invalid_token' &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.refreshToken()
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        AuthService.logout();
        AuthTokenService.removeFromStorage();
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
)

export { axiosClassic, axiosWithAuth }