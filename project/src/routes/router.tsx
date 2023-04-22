import React, { useEffect } from 'react';
import {
  Login,
  PasswordChange,
  Customers,
  CustomerEditForm,
  Signup,
  CustomerAddForm,
} from '../views';
import { Route, Switch } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { sessionUtil } from '../utils';
import { useDispatch } from 'react-redux';
import { setLoginDoneAction } from '../actions';
import Leads from '../views/leads';

const unAuthPaths = ['/login', '/signup'];

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
        history.replace('/login');
      }
    }
  }, [dispatch, history, location]);

  return (
    <Switch>
      <Route exact path="/">
        <Customers />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/passwordChange">
        <PasswordChange />
      </Route>
      <Route path="/customers">
        <Customers />
      </Route>
      <Route exact path="/addcustomer">
        <CustomerAddForm />
      </Route>
      <Route exact path="/editcustomer">
        <CustomerEditForm />
      </Route>
      <Route exact path="/leads">
        <Leads />
      </Route>
    </Switch>
  );
};

export default Routes;
