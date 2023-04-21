import { IFetchCustomersResponse } from './../models/customer.model';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { fetchAllCustomers } from '../api';
import {
  fetchAllCustomersAction,
  fetchAllCustomersDoneAction,
  isLoadingAction,
  setSaveCustomerDoneAction,
  setSelectedCustomersAction,
} from '../actions';
import { getCustomersSearchParams } from '../selectors';

export function* fetchAllCustomersAsync(): SagaIterator {
  try {
    yield put(isLoadingAction(true));
    yield put(setSelectedCustomersAction([]));
    yield put(
      setSaveCustomerDoneAction({
        customer: undefined,
      }),
    );

    const params = yield select(getCustomersSearchParams);

    const response: IFetchCustomersResponse = yield call(fetchAllCustomers, params);

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
