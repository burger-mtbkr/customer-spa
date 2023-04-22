import {
  fetchAllCustomersAction,
  setSelectedCustomersAction,
  setDeleteCustomerDoneAction,
  deleteCustomerAction,
} from '../actions/customers.actions';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { isDeletingAction } from '../actions';
import { deleteCustomer } from '../api';
import { IDeleteCustomerResponse } from '../models';

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
