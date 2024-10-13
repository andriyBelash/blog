import axios, { type CreateAxiosDefaults } from "axios";
import AuthTokenService from "@/services/auth/auth-token.service";
import AuthService from "@/services/auth/auth.service";

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
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        console.log('error if')
        await AuthService.refreshToken()
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        AuthService.logout();
        AuthTokenService.removeFromStorage();
        return Promise.reject(error);
      }
    } else {
      AuthService.logout();
      return Promise.reject(error);
    }
  }
)

export { axiosClassic, axiosWithAuth }