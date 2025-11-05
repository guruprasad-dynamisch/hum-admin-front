import apiClient from "./axiosInstance";
import { AxiosResponse } from "axios";
import {
  ApiResponse,
  LoginResponse,
  ForgotPasswordResponse,
  VerifyResetTokenResponse,
  ResetPasswordResponse,
  RefreshTokenResponse,
} from "@models/api-types";
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

export async function forgotPasswordRequest(email: string): Promise<AxiosResponse<ApiResponse<ForgotPasswordResponse>>> {
  return apiClient.post(AUTH_APIS.forgotPasswordApi, { email });
}

export async function verifyResetTokenRequest(token: string): Promise<AxiosResponse<ApiResponse<VerifyResetTokenResponse>>> {
  return apiClient.post(AUTH_APIS.verifyResetTokenApi, { token });
}

export async function resetPasswordRequest(payload: {
  token: string;
  password: string;
  confirmPassword: string;
}): Promise<AxiosResponse<ApiResponse<ResetPasswordResponse>>> {
  return apiClient.post(AUTH_APIS.resetPasswordApi, payload);
}

export function sendOtpRequest(phone: string): Promise<AxiosResponse<any>> {
  const payload = { phone };
  return apiClient.post(AUTH_APIS.sendOtpApi, payload);
}

export function verifyOtpRequest(
  phone: string,
  code: string
): Promise<AxiosResponse<any>> {
  const payload = { phone, code };
  return apiClient.post(AUTH_APIS.verifyOtpApi, payload);
}

export async function registerProfileRequest(userData: {
  fullName: string;
  email: string;
  phone: string;
  organizationName: string;
  password: string;
  phoneVerificationToken: string;
}): Promise<AxiosResponse<any>> {
  return apiClient.post(AUTH_APIS.registerProfileApi, userData);
}
