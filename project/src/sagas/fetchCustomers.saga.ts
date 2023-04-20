import { IFetchCustomersResponse } from './../models/customer.model';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchAllCustomers } from '../api';
import {
  fetchAllCustomersAction,
  fetchAllCustomersDoneAction,
  isLoadingAction,
  setSaveCustomerDoneAction,
  setSelectedCustomersAction,
} from '../actions';

export function* fetchAllCustomersAsync(action: { payload: string }): SagaIterator {
  try {
    yield put(isLoadingAction(true));
    yield put(setSelectedCustomersAction([]));
    yield put(
      setSaveCustomerDoneAction({
        customer: undefined,
      }),
    );

    const response: IFetchCustomersResponse = yield call(fetchAllCustomers, action.payload);

    yield put(fetchAllCustomersDoneAction(response));
  } catch (error) {
    yield put(
      fetchAllCustomersDoneAction({
        customers: [],
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isLoadingAction(false));
  }
}

export function* fetchAllCustomersSaga(): SagaIterator {
  yield takeLatest(fetchAllCustomersAction, fetchAllCustomersAsync);
}
