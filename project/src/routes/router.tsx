import React, { useEffect } from 'react';
import { Login, PasswordChange, UserSettings } from '../views';
import { Route, Switch } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { sessionUtil } from '../utils';
import Customers from '../views/customers';
import CustomerForm from '../views/customerForm';
import SignupForm from '../views/signupForm';

const unAuthPaths = ['/login', '/signup'];

const Routes = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!unAuthPaths.includes(location.pathname)) {
      const a: boolean = sessionUtil.isActive();
      if (!a) {
        history.replace('/login');
      }
    }
  }, [history, location]);

  return (
    <Switch>
      <Route exact path="/">
        <Customers />
      </Route>
      <Route path="/customers">
        <Customers />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/addcustomer">
        <CustomerForm />
      </Route>
      <Route exact path="/editcustomer">
        <CustomerForm />
      </Route>
      <Route path="/signup">
        <SignupForm />
      </Route>
      <Route path="/userSettings">
        <UserSettings />
      </Route>
      <Route path="/passwordChange">
        <PasswordChange />
      </Route>
    </Switch>
  );
};

export default Routes;
