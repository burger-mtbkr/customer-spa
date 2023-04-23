import { ILoginRequest, ILoginResponse } from './../models';
import { axiosApi, isSuccessfulResponse, storageUtil } from '../utils';

import axios from 'axios';
import { getHeaders } from './headers';
import { loginEndpoint } from './endpoints';

export const loginRequest = async (request: ILoginRequest): Promise<ILoginResponse> => {
  try {
    const headers = getHeaders();
    const response = await axiosApi.post(loginEndpoint, request, { headers: headers });

    if (isSuccessfulResponse(response)) {
      const token = response.data as string;
      if (token) {
        storageUtil.setItem('t', `Bearer ${token}`, request.rememberLogin);
      }

      return {
        isLoggedIn: true,
        isSuccessful: true,
      };
    }
    return {
      isLoggedIn: false,
      isSuccessful: false,
      error: new Error(`An error has occured ${response.statusText}`),
    };
  } catch (error) {
    return {
      isLoggedIn: false,
      isSuccessful: false,
      error: axios.isAxiosError(error) ? error : new Error('An error has occured'),
    };
  }
};
