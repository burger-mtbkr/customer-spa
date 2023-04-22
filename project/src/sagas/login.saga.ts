import { ILoginResponse } from './../models/login.model';
import { loginAction, loginInProgressAction, setLoginDoneAction } from '../actions';
import { loginRequest } from '../api';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ILoginRequest } from '../models';

export function* loginAsync(action: { payload: ILoginRequest }): SagaIterator {
  let response: ILoginResponse = {
  };
  try {
    yield put(loginInProgressAction(true));

    response = yield call(loginRequest, action.payload);
    yield put(setLoginDoneAction(response));
  } catch (error) {
    yield put(setLoginDoneAction({ ...response, error: response.error }));
  } finally {
    yield put(loginInProgressAction(false));
  }
}

export function* loginSaga(): SagaIterator {
  yield takeLatest(loginAction, loginAsync);
}
