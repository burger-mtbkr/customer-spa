import { IPasswordChangeState } from '../models';
import { createReducer } from '@reduxjs/toolkit';
import { setChangePasswordDoneAction } from '../actions';

export const passwordChangeInitialState: IPasswordChangeState = {};

export default createReducer(passwordChangeInitialState, builder =>
  builder.addCase(setChangePasswordDoneAction, (state, { payload }) => ({
    ...state,
    passwordChangeResponse: payload,
  })),
);
