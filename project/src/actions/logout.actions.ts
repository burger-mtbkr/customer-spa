import { createAction } from '@reduxjs/toolkit';

const LOGOUT_PREFIX = 'LOGOUT';

export const logoutProgressAction = createAction<boolean>(`${LOGOUT_PREFIX}API/LOGOUT_IN_PROGRESS`);

export const logoutAction = createAction(`${LOGOUT_PREFIX}/API/LOGOUT`);

export const setLogoutDoneAction = createAction<boolean>(`${LOGOUT_PREFIX}/API/LOGOUT_UP_DONE`);
