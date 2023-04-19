import { createReducer } from '@reduxjs/toolkit';
import { setSignupDoneAction, signupInProgressAction } from '../actions';
import { ISignupState } from '../models';

export const signupInitialState: ISignupState = {
  signupInProgress: false,
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
