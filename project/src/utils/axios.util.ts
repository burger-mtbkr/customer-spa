import axios, { AxiosInstance } from 'axios';

// REMEMBER: if your going to proxy make sure the api is running on the proxy port
export const axiosApi: AxiosInstance = axios.create({
  baseURL:
    `${process.env.REACT_APP_USE_PROXY}` === 'true'
      ? '/api'
      : `${process.env.REACT_APP_API_ENDPOINT}/api`,
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
