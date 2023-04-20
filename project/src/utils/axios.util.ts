import axios, { AxiosInstance } from 'axios';
const apiBaseEndpoint = 'https://localhost:32802/api'; //`${process.env.REACT_APP_API_ENDPOINT}`;

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
