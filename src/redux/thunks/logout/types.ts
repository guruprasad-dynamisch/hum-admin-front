// Types for logout functionality
export interface LogoutResponse {
  success: boolean;
}

export interface LogoutError {
  message: string;
  code?: string;
}
