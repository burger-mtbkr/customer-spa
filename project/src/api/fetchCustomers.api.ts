import { ICustomerSearchRequest } from './../models/customer.model';
import axios from 'axios';
import { IFetchCustomersResponse, CustomerListItem } from '../models';
import { isSuccessfulResponse, axiosApi } from '../utils';
import { getHeaders } from './headers';

const buildQueryUrl = (searchRequest: ICustomerSearchRequest) => {
  const searchParams = new URLSearchParams();
  searchParams.append('sortBy', searchRequest.sortBy);
  searchParams.append('sortDirection', searchRequest.sortDirection);

  if (searchRequest.searchText) searchParams.append('searchText', searchRequest.searchText);

  // only apply the filter if its one of the valid enum values
  if (
    searchRequest.statusFilter === 0 ||
    searchRequest.statusFilter === 1 ||
    searchRequest.statusFilter === 2
  ) {
    searchParams.append('statusFilter', searchRequest.statusFilter.toString());
  }
  return `/customer/search?${searchParams.toString()}`;
};

export const fetchAllCustomers = async (
  searchRequest: ICustomerSearchRequest,
): Promise<IFetchCustomersResponse> => {
  try {
    const headers = getHeaders();
    const response = await axiosApi.get(buildQueryUrl(searchRequest), {
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
