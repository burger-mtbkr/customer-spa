import { call, put, takeLatest } from 'redux-saga/effects';
import {
  deleteCustomerAction,
  fetchAllCustomersAction,
  setDeleteCustomerDoneAction,
  setSelectedCustomersAction,
} from '../actions/customers.actions';

import { IDeleteCustomerResponse } from '../models';
import { SagaIterator } from 'redux-saga';
import { deleteCustomer } from '../api';
import { isDeletingAction } from '../actions';

export function* deleteCustomerAsync(action: { payload: string }): SagaIterator {
  let response: IDeleteCustomerResponse = {};

  try {
    yield put(isDeletingAction(true));

    response = yield call(deleteCustomer, action.payload);

    yield put(setSelectedCustomersAction([]));

    yield put(fetchAllCustomersAction());

    yield put(setDeleteCustomerDoneAction(response));
  } catch (error) {
    yield put(setDeleteCustomerDoneAction({ ...response, error: response.error }));
  } finally {
    yield put(isDeletingAction(false));
  }
}

export function* deleteCustomerSaga(): SagaIterator {
  yield takeLatest(deleteCustomerAction, deleteCustomerAsync);
}
