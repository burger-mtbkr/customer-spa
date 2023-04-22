import { ILead, ILeadResponse } from '../models/lead.model';
import { axiosApi, isSuccessfulResponse } from '../utils';

import axios from 'axios';
import { getHeaders } from './headers';
import { leadsEndpoint } from './endpoints';

export const saveLead = async (lead: ILead): Promise<ILeadResponse> => {
  try {
    const headers = getHeaders();
    const response = lead.id
      ? await axiosApi.put(`${leadsEndpoint}/${lead.id}`, lead, { headers: headers })
      : await axiosApi.post(leadsEndpoint, lead, { headers: headers });

    if (isSuccessfulResponse(response)) {
      return {
        lead: response.data as ILead,
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
