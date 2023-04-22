import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { AxiosError } from 'axios';
import { Order } from './order.model';

export interface ICustomer {
  id?: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phoneNumber: string;
  status: number;
  createdDateUtc: Date;
  leadCount?: number;
}

export type CustomerListItem = ICustomer & {
  id: string;
};

export const CustomerSchema: SchemaOf<ICustomer> = yup
  .object()
  .shape({
    id: yup.string(),
    firstName: yup.string().max(25).min(3).required(),
    lastName: yup.string().max(25).min(3).required(),
    company: yup.string().max(25).min(3).required(),
    email: yup.string().email().max(25).min(3).required(),
    phoneNumber: yup.string().max(20).min(5).required(),
    status: yup.number().oneOf([0, 1, 2], 'Please select a valid status').required(),
  })
  .default({
    id: undefined,
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phoneNumber: '',
    status: 0,
  });

export interface IFetchCustomersResponse {
  customers?: CustomerListItem[];
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export interface ICustomerResponse {
  customer?: ICustomer | undefined;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export interface IDeleteCustomerResponse {
  id?: string;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export interface ICustomerState {
  deleteModalOpen: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  customerSearchRequest: ICustomerSearchRequest;
  customerListResponse?: IFetchCustomersResponse;
  selectedCustomers: CustomerListItem[];
  customerSaveResponse?: ICustomerResponse;
  deleteCustomerResponse?: IDeleteCustomerResponse;
}

export interface ICustomerSearchRequest {
  sortBy: string;
  sortDirection: Order;
  searchText?: string;
  statusFilter?: number;
}
