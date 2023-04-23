import axios, { AxiosInstance } from 'axios';

const customerServiceUrl = `${process.env.REACT_APP_API_ENDPOINT}/api`;
// const customerProxyUrl = '/api';

// if your going to proxy to the api then use the customerProxyUrl above and comment our the customerServiceUrl one.
// set the baseUrl below to customerProxyUrl.
// REMEMBER: to make sure you have the correct proxy url setup in the package.json file for match the url the api is running on.

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
