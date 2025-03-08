import { djangoApi } from "@/lib/axios";

export default class AuthAPI {
  static oauthLogin = async (data: { token: string; provider: string }) => {
    const url = "/api/auth/v1/oauth-login/";
    const response = await djangoApi.post(url, data);
    return response.data;
  };

  static validateToken = async () => {
    const url = "/api/auth/v1/validate-token/";
    const response = await djangoApi.get(url);
    return response.data;
  };
}
