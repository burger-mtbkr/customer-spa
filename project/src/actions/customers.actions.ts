import { CustomerListItem, ICustomerSearchRequest } from './../models/customer.model';
import {
  ICustomer,
  ICustomerResponse,
  IDeleteCustomerResponse,
  IFetchCustomersResponse,
} from '../models';
import { createAction } from '@reduxjs/toolkit';

const CUSTOMER_PREFIX = 'CUSTOMER';

/* APP STATE */
export const setDeleteModalOpenAction = createAction<boolean>(
  `${CUSTOMER_PREFIX}_SET_DELETE_MODAL_OPEN`,
);

export const setSelectedCustomersAction = createAction<CustomerListItem[]>(
  `${CUSTOMER_PREFIX}_SET_SELECTED_CUSTOMERS`,
);

export const isLoadingAction = createAction<boolean>(`${CUSTOMER_PREFIX}/API/CUSTOMERS_IS_LOADING`);

/* LOAD CUSTOMER */

export const fetchCustomerDoneAction = createAction<ICustomerResponse>(
  `${CUSTOMER_PREFIX}/API/FETCH_CUSTOMER_DONE`,
);

/* LOAD ALL CUSTOMERS */

/* LOAD ALL CUSTOMERS */
export const setCustomerSearchRequestAction = createAction<ICustomerSearchRequest>(
  `${CUSTOMER_PREFIX}/API/SET_CUSTOMER_SEARCH_REQUEST_ACTION`,
);

export const fetchAllCustomersAction = createAction(`${CUSTOMER_PREFIX}/API/FETCH_ALL_CUSTOMERS`);

export const fetchAllCustomersDoneAction = createAction<IFetchCustomersResponse>(
  `${CUSTOMER_PREFIX}/API/FETCH_ALL_CUSTOMERS_DONE`,
);

/* SAVE CUSTOMER */
export const isSavingAction = createAction<boolean>(
  `${CUSTOMER_PREFIX}API/SAVE_CUSTOMER_IS_SAVING`,
);

export const saveCustomerAction = createAction<ICustomer>(`${CUSTOMER_PREFIX}/API/SAVE_CUSTOMER`);

export const setSaveCustomerDoneAction = createAction<ICustomerResponse>(
  `${CUSTOMER_PREFIX}/API/SAVE_CUSTOMER_DONE`,
);

/* DELETE CUSTOMER */

export const isDeletingAction = createAction<boolean>(
  `${CUSTOMER_PREFIX}API/DELETE_CUSTOMER_IS_DELETING`,
);

export const deleteCustomerAction = createAction<string>(`${CUSTOMER_PREFIX}/API/DELETE_CUSTOMER`);

export const setDeleteCustomerDoneAction = createAction<IDeleteCustomerResponse>(
  `${CUSTOMER_PREFIX}/API/DELETE_CUSTOMER_DONE`,
);
