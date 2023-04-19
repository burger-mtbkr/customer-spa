import { ISignupRequest, ISignupResponse } from './../models';
import axios from 'axios';
import { isSuccessfulResponse, axiosApi, storageUtil } from '../utils';
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
        isSuccessful: true,
      };
    }
    return {
      isSuccessful: false,
      error: new Error('An error has occured'),
    };
  } catch (error) {
    return {
      isSuccessful: false,
      error: axios.isAxiosError(error) ? error : new Error('An error has occured'),
    };
  }
};
