import axios, { AxiosInstance } from 'axios';

export const axiosApi: AxiosInstance = axios.create({
  baseURL: `/api`,
});

axiosApi.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
