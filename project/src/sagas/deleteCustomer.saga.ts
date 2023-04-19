import {
  fetchAllCustomersAction,
  setSelectedCustomersAction,
  setDeleteCustomerDoneAction,
  deleteCustomerAction,
} from './../actions/customers.actions';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { isDeletingAction } from '../actions';
import { deleteCustomer } from '../api';
import { IDeleteCustomerResponse } from '../models';

export function* deleteCustomerAsync(action: { payload: string }): SagaIterator {
  try {
    yield put(isDeletingAction(true));

    const response: IDeleteCustomerResponse = yield call(deleteCustomer, action.payload);

    yield put(fetchAllCustomersAction());

    yield put(setSelectedCustomersAction([]));

    yield put(setDeleteCustomerDoneAction(response));
  } catch (error) {
    yield put(
      setDeleteCustomerDoneAction({
        id: action.payload,
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isDeletingAction(false));
  }
}

export function* deleteCustomerSaga(): SagaIterator {
  yield takeLatest(deleteCustomerAction, deleteCustomerAsync);
}
