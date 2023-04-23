import axios, { AxiosInstance } from 'axios';

const customerServiceUrl = `${process.env.REACT_APP_API_ENDPOINT}/api`;

export const axiosApi: AxiosInstance = axios.create({
  baseURL: customerServiceUrl,
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
