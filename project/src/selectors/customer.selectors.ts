import { IDeleteCustomerResponse, ICustomerResponse, ICustomer, CustomerListItem } from '../models';
import { TStoreState } from '../reducers';

export const getCustomersLoadingState = (state: TStoreState): boolean => state.customers.isLoading;

export const getAllCustomers = (state: TStoreState): CustomerListItem[] =>
  state.customers.customerListResponse?.customers || [];

export const getSelectedCustomers = (state: TStoreState): CustomerListItem[] =>
  state.customers.selectedCustomers;

export const getEditCustomer = (state: TStoreState): ICustomer | undefined =>
  state.customers.selectedCustomers.length > 0 ? state.customers.selectedCustomers[0] : undefined;

export const selectIsSaving = (state: TStoreState): boolean => state.customers.isSaving;

export const getCustomerSaveResponse = (state: TStoreState): ICustomerResponse | undefined =>
  state.customers.customerSaveResponse;

export const getDeleteModalOpen = (state: TStoreState): boolean => state.customers.deleteModalOpen;

export const getDeleteCustomerResponse = (
  state: TStoreState,
): IDeleteCustomerResponse | undefined => state.customers.deleteCustomerResponse;
