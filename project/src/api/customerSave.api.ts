import { ICustomer, ICustomerResponse } from '../models';
import { axiosApi, isSuccessfulResponse } from '../utils';

import axios from 'axios';
import { getHeaders } from './headers';

export const saveCustomer = async (customer: ICustomer): Promise<ICustomerResponse> => {
  try {
    const headers = getHeaders();
    const response = customer.id
      ? await axiosApi.put(`/customer/${customer.id}`, customer, { headers: headers })
      : await axiosApi.post(`/customer`, customer, { headers: headers });

    if (isSuccessfulResponse(response)) {
      return {
        customer: response.data as ICustomer,
        isSuccessful: true,
      };
    }
    return {
      customer,
      isSuccessful: false,
      error: new Error(`An error has occured ${response.statusText}`),
    };
  } catch (error) {
    return {
      customer,
      isSuccessful: false,
      error: axios.isAxiosError(error) ? error : new Error('An error has occured'),
    };
  }
};
