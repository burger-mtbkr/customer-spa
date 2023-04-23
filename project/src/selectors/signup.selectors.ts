import { ISignupResponse } from './../models/signup.model';
import { TStoreState } from '../reducers';

export const signupInProgress = (state: TStoreState): boolean => state.signup.signupInProgress;
export const getSignupResponse = (state: TStoreState): ISignupResponse | undefined =>
  state.signup.signupResponse;
