import { loginInProgressAction, setLoginDoneAction } from '../actions';
import { createReducer } from '@reduxjs/toolkit';

import { ILoginState } from '../models';

export const sessionInitialState: ILoginState = {
  loginInProgress: false,
};

export default createReducer(sessionInitialState, builder =>
  builder
    .addCase(loginInProgressAction, (state, { payload }) => ({
      ...state,
      loginInProgress: payload,
    }))
    .addCase(setLoginDoneAction, (state, { payload }) => ({
      ...state,
      loginResponse: payload,
    })),
);
