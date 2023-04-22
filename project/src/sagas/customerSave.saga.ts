import {
  isSavingAction,
  saveCustomerAction,
  setSaveCustomerDoneAction,
} from '../actions/customers.actions';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ICustomerResponse, ICustomer } from '../models';
import { saveCustomer } from '../api';

export function* saveCustomerAsync(action: { payload: ICustomer }): SagaIterator {
  try {
    yield put(isSavingAction(true));

    const response: ICustomerResponse = yield call(saveCustomer, action.payload);
    yield put(setSaveCustomerDoneAction(response));
  } catch (error) {
    yield put(
      setSaveCustomerDoneAction({
        customer: action.payload,
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isSavingAction(false));
  }
}

export function* saveCustomerSaga(): SagaIterator {
  yield takeLatest(saveCustomerAction, saveCustomerAsync);
}
