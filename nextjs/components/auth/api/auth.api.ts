import { djangoApi } from "@/lib/axios";

export const googleLogin = async (data: { token: string }) => {
  const url = "/api/auth/v1/google-login/";
  const response = await djangoApi.post(url, data);
  return response.data;
};
