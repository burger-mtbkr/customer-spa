import { call, put, takeLatest } from 'redux-saga/effects';
import { loginAction, loginInProgressAction, setLoginDoneAction } from '../actions';

import { ILoginRequest } from '../models';
import { SagaIterator } from 'redux-saga';
import { logoutRequest } from '../api';
import { sessionUtil } from '../utils';

export function* logoutAsync(action: { payload: ILoginRequest }): SagaIterator {
  try {
    yield put(loginInProgressAction(true));

    const response: boolean = yield call(logoutRequest);
    if (response) {
      sessionUtil.deleteSessionInfo();

      yield put(
        setLoginDoneAction({
          isLoggedIn: false,
          isSuccessful: true,
        }),
      );
    } else {
      yield put(
        setLoginDoneAction({
          isLoggedIn: false,
          isSuccessful: false,
        }),
      );
    }
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

export function* logoutSaga(): SagaIterator {
  yield takeLatest(loginAction, logoutAsync);
}
