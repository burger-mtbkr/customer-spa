import axios from 'axios';
import { IFetchCustomersResponse, CustomerListItem } from '../models';
import { isSuccessfulResponse, axiosApi } from '../utils';
import { getHeaders } from './headers';

export const fetchAllCustomers = async (searchText: string): Promise<IFetchCustomersResponse> => {
  try {
    const headers = getHeaders();
    const response = await axiosApi.get(`/customer/search?searchText=${searchText}`, {
      headers: headers,
    });

    if (isSuccessfulResponse(response)) {
      return {
        customers: response.data as CustomerListItem[],
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
