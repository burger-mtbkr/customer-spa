import { ILoginResponse } from './../models/login.model';
import { loginAction, loginInProgressAction, setLoginDoneAction } from '../actions';
import { loginRequest } from '../api';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ILoginRequest } from '../models';

export function* loginAsync(action: { payload: ILoginRequest }): SagaIterator {
  try {
    yield put(loginInProgressAction(true));

    const response: ILoginResponse = yield call(loginRequest, action.payload);
    yield put(setLoginDoneAction(response));
  } catch (error) {
    yield put(
      setLoginDoneAction({
        error: error as Error,
        isLoggedIn: false,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(loginInProgressAction(false));
  }
}

export function* loginSaga(): SagaIterator {
  yield takeLatest(loginAction, loginAsync);
}