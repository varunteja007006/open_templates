import { djangoApi } from "@/lib/axios";

export default class AuthAPI {
  static googleLogin = async (data: { token: string }) => {
    const url = "/api/auth/v1/google-login/";
    const response = await djangoApi.post(url, data);
    return response.data;
  };

  static validateToken = async () => {
    const url = "/api/auth/v1/validate-token/";
    const response = await djangoApi.get(url);
    return response.data;
  };
}
