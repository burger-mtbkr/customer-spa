import {
  IPasswordChangeRequest,
  IPasswordChangeResponse,
} from '../models/password.changerequest.model';
import { axiosApi, isSuccessfulResponse } from '../utils';

import axios from 'axios';
import { getHeaders } from './headers';
import { userEndpoint } from './endpoints';

export const changePassword = async (
  model: IPasswordChangeRequest,
): Promise<IPasswordChangeResponse> => {
  try {
    const headers = getHeaders();
    const response = await axiosApi.patch(`${userEndpoint}/${model.userId}`, model, {
      headers: headers,
    });

    if (isSuccessfulResponse(response)) {
      return {
        isSuccessful: true,
      };
    }

    return {
      isSuccessful: false,
      error: new Error(`An error has occured ${response.statusText}`),
    };
  } catch (error) {
    return {
      error: axios.isAxiosError(error) ? error : new Error('An error has occured'),
      isSuccessful: true,
    };
  }
};
