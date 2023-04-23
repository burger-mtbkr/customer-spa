import { ISignupRequest, ISignupResponse } from './../models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setSignupDoneAction, signUpAction, signupInProgressAction } from '../actions';

import { SagaIterator } from 'redux-saga';
import { setLoginDoneAction } from './../actions';
import { signUp } from './../api';

export function* signupAsync(action: { payload: ISignupRequest }): SagaIterator {
  let response: ISignupResponse = {};
  try {
    yield put(signupInProgressAction(true));
    response = yield call(signUp, action.payload);
    yield put(setSignupDoneAction(response));
    yield put(
      setLoginDoneAction({
        isLoggedIn: true,
        isSuccessful: true,
      }),
    );
  } catch (error) {
    yield put(setSignupDoneAction({ ...response, error: response.error }));
  } finally {
    yield put(signupInProgressAction(false));
  }
}

export function* signupSaga(): SagaIterator {
  yield takeLatest(signUpAction, signupAsync);
}
