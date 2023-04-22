import { IFetchLeadsResponse, ILeadListItem } from '../models';
import { axiosApi, isSuccessfulResponse } from '../utils';

import axios from 'axios';
import { getHeaders } from './headers';

export const fetchCustomerLeads = async (customerId: string): Promise<IFetchLeadsResponse> => {
  try {
    const leadsUrl = `/leads/customer/${customerId}`;

    const headers = getHeaders();
    const response = await axiosApi.get(leadsUrl, {
      headers: headers,
    });

    if (isSuccessfulResponse(response)) {
      return {
        leads: response.data as ILeadListItem[],
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
