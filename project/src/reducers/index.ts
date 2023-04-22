import { StateFromReducersMapObject } from '@reduxjs/toolkit';
import app, { appInitialState } from './app.reducer';
import signup, { signupInitialState } from './signup.reducer';
import session, { sessionInitialState } from './session.reducer';
import customers, { customerInitialState } from './customer.reducer';
import leads, { leadInitialState } from './leads.reducer';

export const reducer = {
  app,
  signup,
  session,
  customers,
  leads,
};

export type TAppState = StateFromReducersMapObject<typeof reducer>;
export type TStoreState = TAppState;

export const rootInitialState: TStoreState = {
  app: appInitialState,
  signup: signupInitialState,
  session: sessionInitialState,
  customers: customerInitialState,
  leads: leadInitialState,
};
