import { ILoginResponse } from '../models';
import { TStoreState } from '../reducers';
export const loginInProgress = (state: TStoreState): boolean => state.session.loginInProgress;
export const loggedIn = (state: TStoreState): boolean =>
  state.session.loginResponse?.isLoggedIn ?? false;

export const getLoginResponse = (state: TStoreState): ILoginResponse | undefined =>
  state.session.loginResponse;
