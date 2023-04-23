import { axiosApi, isSuccessfulResponse } from '../utils';

import { IDeleteCustomerResponse } from '../models';
import axios from 'axios';
import { getHeaders } from './headers';

export const deleteCustomer = async (id: string): Promise<IDeleteCustomerResponse> => {
  try {
    const headers = getHeaders();
    const response = await axiosApi.delete(`customer/${id}`, { headers: headers });

    if (isSuccessfulResponse(response)) {
      return {
        id,
        isSuccessful: true,
      };
    }
    return {
      id,
      isSuccessful: false,
      error: new Error(`An error has occured ${response.statusText}`),
    };
  } catch (error) {
    return {
      id,
      isSuccessful: false,
      error: axios.isAxiosError(error) ? error : new Error('An error has occured'),
    };
  }
};
