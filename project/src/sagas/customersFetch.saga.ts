import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchAllCustomersAction,
  fetchAllCustomersDoneAction,
  isLoadingAction,
  setSaveCustomerDoneAction,
  setSelectedCustomersAction,
} from '../actions';

import { IFetchCustomersResponse } from '../models';
import { SagaIterator } from 'redux-saga';
import { fetchAllCustomers } from '../api';
import { getCustomersSearchParams } from '../selectors';

export function* fetchAllCustomersAsync(): SagaIterator {
  let response: IFetchCustomersResponse = {};

  try {
    yield put(isLoadingAction(true));
    yield put(setSelectedCustomersAction([]));
    yield put(
      setSaveCustomerDoneAction({
        customer: undefined,
      }),
    );

    const params = yield select(getCustomersSearchParams);
    response = yield call(fetchAllCustomers, params);
    yield put(fetchAllCustomersDoneAction(response));
  } catch (error) {
    yield put(fetchAllCustomersDoneAction({ ...response, error: response.error }));
  } finally {
    yield put(isLoadingAction(false));
  }
}

export function* fetchAllCustomersSaga(): SagaIterator {
  yield takeLatest(fetchAllCustomersAction, fetchAllCustomersAsync);
}
