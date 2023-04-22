import { LeadStatus } from './../enums/leadStatus.enum';
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { AxiosError } from 'axios';

export interface ILead {
  id?: string;
  customerId: string;
  status: LeadStatus;
  name: string;
  source: string;
  createdDateUtc: Date;
}

export type ILeadListItem = ILead & {
  id: string;
};

export const LeadSchema: SchemaOf<ILead> = yup
  .object()
  .shape({
    id: yup.string(),
    customerId: yup.string().required('Please select a customer'),
    name: yup.string().max(25).min(3).required(),
    source: yup.string().max(25).min(3).required(),
    status: yup.number().oneOf([0, 1, 2]).required(),
  })
  .default({
    id: undefined,
    customerId: '',
    name: '',
    source: '',
    status: 0,
  });

export interface IFetchLeadsResponse {
  leads?: ILeadListItem[];
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export interface ILeadResponse {
  lead?: ILead | undefined;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export interface ILeadsState {
  isLoading: boolean;
  isSaving: boolean;
  leadsListResponse?: IFetchLeadsResponse;
  selectedLead?: ILeadListItem;
  leadSaveResponse?: ILeadResponse;
}
