import apiClient from "./axiosInstance";
import { AxiosResponse } from "axios";
import { ApiResponse, LoginResponse, RefreshTokenResponse } from "@models/api-types";
import { AUTH_APIS } from "@constants/auth-constants";

// Re-export AUTH_APIS for backward compatibility
export { AUTH_APIS };

export async function loginRequest(credentials: {
  identifier: string;
  password: string;
}): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
  return apiClient.post(AUTH_APIS.loginApi, credentials);
}

export async function logoutRequest(): Promise<AxiosResponse<ApiResponse>> {
  return apiClient.post(AUTH_APIS.logoutApi, {});
}

export async function refreshTokenRequest(): Promise<AxiosResponse<ApiResponse<RefreshTokenResponse>>> {
  // Refresh token is sent automatically via HTTP-only cookies
  return apiClient.get(AUTH_APIS.refreshTokenApi);
}
