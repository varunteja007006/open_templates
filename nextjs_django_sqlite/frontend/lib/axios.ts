import axios from "axios";

import { refreshSession } from "@/features/auth/api/login.api";

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
    if (
      error.response?.status === 401 &&
      error.config.url === "/api/v1/auth/validate-token"
    ) {
      console.log("Here");
      await callRefresh();
    }

    if (error.response.headers["content-type"] === "application/json") {
      const data = (error.response?.data || error.response?.detail) ?? "";
      const dataArr = Object.values(data);
      const errorMessage = _.join(dataArr, ", ");
      error.response.data = errorMessage;
    }

    return Promise.reject(error);
  }
);

export default axios;

const callRefresh = async () => {
  const onSuccess = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  try {
    let res = await refreshSession();
    if (res?.success) {
      onSuccess();
    }
  } catch (error) {
    console.error(error);
  }
};
