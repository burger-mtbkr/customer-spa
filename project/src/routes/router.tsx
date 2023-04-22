import {
  CUSTOMER_ADD,
  CUSTOMER_EDIT,
  CUSTOMER_LIST,
  LEAD_ADD,
  LEAD_EDIT,
  LEAD_LIST,
  LOGIN,
  PASSWORD_CHANGE,
  ROOT,
  SIGNUP,
} from './paths';
import {
  CustomerAddForm,
  CustomerEditForm,
  Customers,
  LeadAddForm,
  Login,
  PasswordChange,
  Signup,
} from '../views';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';

import { LeadEditForm } from '../views/leadEditForm';
import Leads from '../views/leads';
import { sessionUtil } from '../utils';
import { setLoginDoneAction } from '../actions';
import { useDispatch } from 'react-redux';

const unAuthPaths = [LOGIN, SIGNUP];

const Routes = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!unAuthPaths.includes(location.pathname)) {
      const active: boolean = sessionUtil.isActive();

      if (active) {
        dispatch(setLoginDoneAction({ isLoggedIn: true, isSuccessful: true }));
      } else {
        dispatch(setLoginDoneAction({ isLoggedIn: false, isSuccessful: true }));
        history.replace(LOGIN);
      }
    }
  }, [dispatch, history, location]);

  return (
    <Switch>
      <Route exact path={ROOT}>
        <Customers />
      </Route>
      <Route path={SIGNUP}>
        <Signup />
      </Route>
      <Route path={LOGIN}>
        <Login />
      </Route>
      <Route path={PASSWORD_CHANGE}>
        <PasswordChange />
      </Route>
      <Route path={CUSTOMER_LIST}>
        <Customers />
      </Route>
      <Route exact path={CUSTOMER_ADD}>
        <CustomerAddForm />
      </Route>
      <Route exact path={CUSTOMER_EDIT}>
        <CustomerEditForm />
      </Route>
      <Route exact path={LEAD_LIST}>
        <Leads />
      </Route>
      <Route exact path={LEAD_ADD}>
        <LeadAddForm />
      </Route>
      <Route exact path={LEAD_EDIT}>
        <LeadEditForm />
      </Route>
    </Switch>
  );
};

export default Routes;
