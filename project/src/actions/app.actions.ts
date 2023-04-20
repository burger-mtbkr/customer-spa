import { createAction } from '@reduxjs/toolkit';

const APP_PREFIX = 'APP';

export const setLogoutModalOpenAction = createAction<boolean>(
  `${APP_PREFIX}_SET_LOGOUT_MODAL_OPEN`,
);

export const setUserMenuOpenAction = createAction<boolean>(`${APP_PREFIX}_SET_USER_MENU_OPEN`);

export const setAppDrawerOpenAction = createAction<boolean>(`${APP_PREFIX}_SET_APP_DRAWER_OPEN`);
