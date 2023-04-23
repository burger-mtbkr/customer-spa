import { setSignupDoneAction, signupInProgressAction } from '../actions';

import { ISignupState } from '../models';
import { createReducer } from '@reduxjs/toolkit';

export const signupInitialState: ISignupState = {
  signupInProgress: false,
  signupResponse: undefined,
};

export default createReducer(signupInitialState, builder =>
  builder
    .addCase(signupInProgressAction, (state, { payload }) => ({
      ...state,
      signupInProgress: payload,
    }))
    .addCase(setSignupDoneAction, (state, { payload }) => ({
      ...state,
      signupResponse: payload,
    })),
);
