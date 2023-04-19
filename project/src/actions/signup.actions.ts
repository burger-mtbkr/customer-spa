import { ISignupResponse, ISignup } from './../models';
import { createAction } from '@reduxjs/toolkit';

const SIGN_UP_PREFIX = 'SIGN_UP';

export const signupInProgressAction = createAction<boolean>(`${SIGN_UP_PREFIX}API/SIGN_UP_IN_PROGRESS`);

export const signUpAction = createAction<ISignup>(`${SIGN_UP_PREFIX}/API/SIGN_UP`);

export const setSignupDoneAction = createAction<ISignupResponse>(
  `${SIGN_UP_PREFIX}/API/SIGN_UP_DONE`,
);
