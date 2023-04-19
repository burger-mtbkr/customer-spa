import { signupInProgressAction } from './../actions/signup.actions';

import { signUpAction } from './../actions';
import { signUp } from './../api';
import { ISignupRequest, ISignupResponse } from './../models/signup.model';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setSignupDoneAction } from '../actions/signup.actions';

export function* signupAsync(action: { payload: ISignupRequest }): SagaIterator {
  try {
    yield put(signupInProgressAction(true));

    const response: ISignupResponse = yield call(signUp, action.payload);
    yield put(setSignupDoneAction(response));
  } catch (error) {
    yield put(
      setSignupDoneAction({
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(signupInProgressAction(false));
  }
}

export function* signupSaga(): SagaIterator {
  yield takeLatest(signUpAction, signupAsync);
}
