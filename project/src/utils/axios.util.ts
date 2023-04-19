import axios, { AxiosInstance } from 'axios';
const apiBaseEndpoint: string = `${process.env.REACT_APP_API_ENDPOINT}`;

export const axiosApi: AxiosInstance = axios.create({
  baseURL: apiBaseEndpoint,
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
