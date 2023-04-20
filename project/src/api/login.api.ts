import { ILoginRequest, ILoginResponse } from './../models';
import axios from 'axios';
import { isSuccessfulResponse, axiosApi, storageUtil } from '../utils';
import { getHeaders } from './headers';

export const loginRequest = async (request: ILoginRequest): Promise<ILoginResponse> => {
  try {
    const headers = getHeaders();
    const response = await axiosApi.post(`/login`, request, { headers: headers });

    if (isSuccessfulResponse(response)) {
      const token = response.data as string;
      if (token) {
        storageUtil.setItem('t', `Bearer ${token}`, true);
      }

      return {
        isLoggedIn: true,
        isSuccessful: true,
      };
    }
    return {
      isLoggedIn: false,
      isSuccessful: false,
      error: new Error('An error has occured'),
    };
  } catch (error) {
    return {
      isLoggedIn: false,
      isSuccessful: false,
      error: axios.isAxiosError(error) ? error : new Error('An error has occured'),
    };
  }
};
