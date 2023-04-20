import { setLoginDoneAction } from './../actions';
import { signUp } from './../api';
import { ISignupRequest, ISignupResponse } from './../models';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { signUpAction, setSignupDoneAction, signupInProgressAction } from '../actions';

export function* signupAsync(action: { payload: ISignupRequest }): SagaIterator {
  try {
    yield put(signupInProgressAction(true));

    const response: ISignupResponse = yield call(signUp, action.payload);
    yield put(setSignupDoneAction(response));
    yield put(
      setLoginDoneAction({
        isLoggedIn: true,
        isSuccessful: true,
      }),
    );
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
