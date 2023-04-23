import { IPasswordChangeRequest, IPasswordChangeResponse } from '../models';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  changePasswordAction,
  loginInProgressAction,
  setChangePasswordDoneAction,
} from '../actions';

import { SagaIterator } from 'redux-saga';
import { changePassword } from './../api/changeUserPassword.api';

export function* changePasswordAsync(action: { payload: IPasswordChangeRequest }): SagaIterator {
  let response: IPasswordChangeResponse = {};

  try {
    yield put(loginInProgressAction(true));
    response = yield call(changePassword, action.payload);
    yield put(setChangePasswordDoneAction(response));
  } catch (error) {
    yield put(setChangePasswordDoneAction({ ...response, error: response.error }));
  }
}

export function* changePasswordSaga(): SagaIterator {
  yield takeLatest(changePasswordAction, changePasswordAsync);
}
