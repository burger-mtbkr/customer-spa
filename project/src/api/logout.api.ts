import { axiosApi, isSuccessfulResponse } from '../utils';

import { AxiosResponse } from 'axios';
import { getHeaders } from './headers';

export const logoutRequest = async (): Promise<boolean> => {
  const headers = getHeaders();
  var response: AxiosResponse<unknown> = await axiosApi.delete(`/logout`, { headers: headers });
  if (isSuccessfulResponse(response)) {
    return true;
  }
  return false;
};
