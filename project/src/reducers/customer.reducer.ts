import {
  fetchAllCustomersDoneAction,
  isDeletingAction,
  isLoadingAction,
  isSavingAction,
  setCustomerSearchRequestAction,
  setDeleteCustomerDoneAction,
  setDeleteModalOpenAction,
  setSaveCustomerDoneAction,
  setSelectedCustomersAction,
} from '../actions';

import { ICustomerState } from '../models';
import { createReducer } from '@reduxjs/toolkit';

export const customerInitialState: ICustomerState = {
  deleteModalOpen: false,
  isLoading: false,
  isSaving: false,
  isDeleting: false,
  selectedCustomers: [],
  customerSearchRequest: {
    sortBy: 'firstName',
    sortDirection: 'asc',
  },
};

export default createReducer(customerInitialState, builder =>
  builder
    .addCase(isLoadingAction, (state, { payload }) => ({
      ...state,
      isLoading: payload,
    }))
    .addCase(isSavingAction, (state, { payload }) => ({
      ...state,
      isSaving: payload,
    }))
    .addCase(isDeletingAction, (state, { payload }) => ({
      ...state,
      isDeleting: payload,
    }))
    .addCase(setDeleteModalOpenAction, (state, { payload }) => ({
      ...state,
      deleteModalOpen: payload,
    }))
    .addCase(setSelectedCustomersAction, (state, { payload }) => ({
      actionTriggerRefetching: undefined,
      ...state,
      selectedCustomers: payload,
    }))
    .addCase(setCustomerSearchRequestAction, (state, { payload }) => ({
      ...state,
      customerSearchRequest: payload,
    }))
    .addCase(fetchAllCustomersDoneAction, (state, { payload }) => ({
      ...state,
      customerListResponse: payload,
    }))
    .addCase(setSaveCustomerDoneAction, (state, { payload }) => ({
      ...state,
      customerSaveResponse: payload,
    }))
    .addCase(setDeleteCustomerDoneAction, (state, { payload }) => ({
      ...state,
      deleteCustomerResponse: payload,
    })),
);
