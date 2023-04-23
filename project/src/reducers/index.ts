import app, { appInitialState } from './app.reducer';
import customers, { customerInitialState } from './customer.reducer';
import leads, { leadInitialState } from './leads.reducer';
import passwordChange, { passwordChangeInitialState } from './passwordChange.reducer';
import session, { sessionInitialState } from './session.reducer';
import signup, { signupInitialState } from './signup.reducer';

import { StateFromReducersMapObject } from '@reduxjs/toolkit';

export const reducer = {
  app,
  signup,
  session,
  passwordChange,
  customers,
  leads,
};

export type TAppState = StateFromReducersMapObject<typeof reducer>;
export type TStoreState = TAppState;

export const rootInitialState: TStoreState = {
  app: appInitialState,
  signup: signupInitialState,
  session: sessionInitialState,
  passwordChange: passwordChangeInitialState,
  customers: customerInitialState,
  leads: leadInitialState,
};
