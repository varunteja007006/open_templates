import axios from "axios";

import {
  loginUserRefreshV2,
  socialTokenRefresh,
} from "@/features/auth/api/login.api";

import _ from "lodash";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_API}`;
axios.defaults.timeout = 1000;
axios.defaults.withCredentials = true; // for cookies

axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    const refresh = async () => {
      try {
        return await loginUserRefreshV2();
      } catch (err) {
        console.error(err);
      }
    };

    const refresh2 = async () => {
      try {
        return await socialTokenRefresh();
      } catch (err) {
        console.error(err);
      }
    };

    const callRefresh = async () => {
      const onSuccess = () => {
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      };

      let res = await refresh();
      if (!res || !res.success) {
        res = await refresh2();
      }

      if (res && res.success) {
        onSuccess();
      }
    };

    if (error.response?.status === 401) {
      await callRefresh(); // Awaiting here ensures proper flow.
    }

    const data = error.response?.data ?? {};
    const dataArr = Object.values(data);
    const errorMessage = _.join(dataArr, ", ");
    error.response.data = errorMessage;

    return Promise.reject(error);
  }
);

export default axios;
