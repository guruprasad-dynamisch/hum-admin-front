import apiClient from "./axiosInstance";
import { AxiosResponse } from "axios";
import { ApiResponse, UserInfoResponse } from "@models/api-types";

export const USER_APIS = {
  userInfoApi: "/api/auth/user-info",
};

export async function getUserInfoRequest(): Promise<AxiosResponse<ApiResponse<UserInfoResponse>>> {
  return apiClient.get(USER_APIS.userInfoApi);
}
