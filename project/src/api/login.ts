import { AxiosResponse } from 'axios';
import { ILogin } from '../models/login.model';
import { axiosApi, isSuccessfulResponse, storageUtil } from '../utils';

export const loginRequest = async (model: ILogin): Promise<string> => {
  var response: AxiosResponse<unknown> = await axiosApi.post(`/Login`, {
    email: model.email,
    password: model.password,
  });

  if (isSuccessfulResponse(response)) {
    const token = response.data as string;
    if (token) {
      storageUtil.setItem('t', `Bearer ${token}`, true);
      return token;
    }
  }

  throw new Error(response.statusText);
};
