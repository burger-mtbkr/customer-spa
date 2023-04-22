import { ILoginRequest, ILoginResponse } from './../models';
import { createAction } from '@reduxjs/toolkit';

const LOGIN_PREFIX = 'LOGIN';

export const loginInProgressAction = createAction<boolean>(`${LOGIN_PREFIX}API/LOGIN_IN_PROGRESS`);

export const loginAction = createAction<ILoginRequest>(`${LOGIN_PREFIX}/API/LOGIN`);

export const setLoginDoneAction = createAction<ILoginResponse>(`${LOGIN_PREFIX}/API/LOGIN_UP_DONE`);
