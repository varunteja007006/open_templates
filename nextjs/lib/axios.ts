import axios from "axios";

const djangoApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API}`,
  timeout: 1000,
  withCredentials: true, // for cookies
});

djangoApi.interceptors.request.use((config) => {
  return config;
});

djangoApi.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    return Promise.reject(error);
  }
);

export { djangoApi };
