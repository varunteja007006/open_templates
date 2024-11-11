import axios from "@/lib/axios";
import {
  LoginFormSchemaType,
  SignUpFormSchemaType,
  socialLoginPayloadType,
  validateTokenType,
} from "../types/auth.types";

export const loginUser = async (data: LoginFormSchemaType) => {
  const response = await axios.post<{ success: boolean }>(
    "/api/v1/auth/login",
    data
  );
  return response.data;
};

export const loginUserV2 = async (data: LoginFormSchemaType) => {
  const response = await axios.post<{ success: boolean }>(
    "/api/v1/auth/login/token/v2",
    data
  );
  return response.data;
};

export const loginUserRefreshV2 = async () => {
  const response = await axios.post<{ success: boolean }>(
    "/api/v1/auth/login/token/refresh/v2"
  );
  return response.data;
};

export const signup = async (data: SignUpFormSchemaType) => {
  const response = await axios.post<{ success: boolean }>(
    "/api/v1/auth/sign-up",
    data
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post<{ success: boolean }>(
    "/api/v1/auth/logout"
  );
  return response.data;
};

export const validateToken = async () => {
  const response = await axios.get<validateTokenType>(
    "/api/v1/auth/validate-token"
  );
  return response.data;
};

export const socialTokenLogin = async (data: socialLoginPayloadType) => {
  const response = await axios.post<{ success: boolean }>(
    "/api/v1/auth/login/token/convert/social-token/v2",
    {
      grant_type: "convert_token",
      backend: "google-oauth2",
      ...data,
    }
  );
  return response.data;
};

export const socialTokenRefresh = async () => {
  const response = await axios.post<{ success: boolean }>(
    "/api/v1/auth/login/token/refresh/social-token/v2"
  );
  return response.data;
};

export function loginWithGoogle({
  state,
  client_id,
}: {
  state?: string;
  client_id: string;
}) {
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Parameters to pass to OAuth 2.0 endpoint.
  const params: Record<string, string> = {
    client_id: client_id,
    redirect_uri: "http://localhost:3000/login/login-via-google",
    response_type: "token",
    // Multiple scopes separated by space
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    include_granted_scopes: "true",
    state: state ?? "",
  };

  // Build the full URL with query params for the redirection
  const urlParams = new URLSearchParams(params).toString();
  const authUrl = `${oauth2Endpoint}?${urlParams}`;

  // Redirect the user to Google's OAuth 2.0 endpoint
  window.location.href = authUrl;
}