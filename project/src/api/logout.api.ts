import { AxiosResponse } from 'axios';
import { axiosApi } from '../utils';
import { getHeaders } from './headers';

export const logoutRequest = async (): Promise<boolean> => {
  const headers = getHeaders();
  var response: AxiosResponse<unknown> = await axiosApi.delete(`/logout`, { headers: headers });
  if (response.status === 200) {
    const data = response.data as boolean;
    return data;
  }
  throw new Error(response.statusText);
};
