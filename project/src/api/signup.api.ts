import { ISignupRequest, ISignupResponse } from './../models';
import { axiosApi, isSuccessfulResponse, storageUtil } from '../utils';

import axios from 'axios';
import { getHeaders } from './headers';

export const signUp = async (request: ISignupRequest): Promise<ISignupResponse> => {
  try {
    const headers = getHeaders();
    const response = await axiosApi.post(`/signup`, request, { headers: headers });

    if (isSuccessfulResponse(response)) {
      const token = response.data as string;
      if (token) {
        storageUtil.setItem('t', `Bearer ${token}`, true);
      }
      return {
        error: undefined,
      };
    }
    return {
      error: new Error(`An error has occured ${response.statusText}`),
    };
  } catch (error) {
    return {
      error: axios.isAxiosError(error) ? error : new Error('An error has occured'),
    };
  }
};
