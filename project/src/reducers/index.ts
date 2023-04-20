import { StateFromReducersMapObject } from '@reduxjs/toolkit';
import customers, { customerInitialState } from './customer.reducer';
import signup, { signupInitialState } from './signup.reducer';
import session, { sessionInitialState } from './session.reducer';
import app, { appInitialState } from './app.reducer';

export const reducer = {
  app,
  signup,
  session,
  customers,
};

export type TAppState = StateFromReducersMapObject<typeof reducer>;
export type TStoreState = TAppState;

export const rootInitialState: TStoreState = {
  app: appInitialState,
  signup: signupInitialState,
  session: sessionInitialState,
  customers: customerInitialState,
};
