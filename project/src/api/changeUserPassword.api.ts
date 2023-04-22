import { axiosApi } from '../utils';
import { AxiosResponse } from 'axios';
import { IPasswordChangeRequest } from '../models/password.changerequest.model';
import { getHeaders } from './headers';
import { userEndpoint } from './endpoints';

export const changePassword = async (
  model: IPasswordChangeRequest,
): Promise<boolean | undefined> => {
  let response: AxiosResponse<unknown>;
  const headers = getHeaders();

  if (model) {
    response = await axiosApi.patch(`${userEndpoint}/${model.userId}`, model, { headers: headers });
  } else {
    throw new Error('Invalid password request');
  }

  if (response.status === 200 || response.status === 204) {
    if (response.data) {
      return response.data as boolean;
    }
    return undefined;
  }
  throw new Error(response.statusText);
};
