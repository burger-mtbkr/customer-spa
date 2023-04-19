import { StateFromReducersMapObject } from '@reduxjs/toolkit';
import customers, { customerInitialState } from './customer.reducer';
import signup, { signupInitialState } from './signup.reducer';

export const reducer = {
  signup,
  customers,
};

export type TAppState = StateFromReducersMapObject<typeof reducer>;
export type TStoreState = TAppState;

export const rootInitialState: TStoreState = {
  signup: signupInitialState,
  customers: customerInitialState,
};
