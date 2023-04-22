import { setAppDrawerOpenAction, setUserMenuOpenAction } from './../actions/app.actions';

import { IAppState } from '../models';
import { createReducer } from '@reduxjs/toolkit';
import { setLogoutModalOpenAction } from '../actions';

export const appInitialState: IAppState = {
  logoutModalOpen: false,
  appDrawerOpen: false,
  userMenuOpen: false,
};

export default createReducer(appInitialState, builder =>
  builder
    .addCase(setLogoutModalOpenAction, (state, { payload }) => ({
      ...state,
      logoutModalOpen: payload,
    }))
    .addCase(setAppDrawerOpenAction, (state, { payload }) => ({
      ...state,
      appDrawerOpen: payload,
    }))
    .addCase(setUserMenuOpenAction, (state, { payload }) => ({
      ...state,
      userMenuOpen: payload,
    })),
);
