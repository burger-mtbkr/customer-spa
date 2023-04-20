import React, { useEffect, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { Typography, Container, Paper } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { ILogin, LoginSchema } from '../models/login.model';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../actions';
import { getLoginResponse } from '../selectors/session.selectors';
import { LoginForm } from '../components/login/loginForm';
import { LoginButtons } from '../components/login/loginButtons';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  layout: {
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const loginResponse = useSelector(getLoginResponse);

  useEffect(() => {
    if (loginResponse?.isLoggedIn) {
      history.push('/');
    }
  }, [loginResponse, history]);

  const [loginDetail, setLoginDetail] = useState<ILogin>(LoginSchema.default({}) as ILogin);

  const onReset = (): void => setLoginDetail(LoginSchema.default({}) as ILogin);

  const onSubmit = async (model: ILogin) => {
    dispatch(loginAction(model));
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Formik<ILogin>
          onSubmit={onSubmit}
          onReset={onReset}
          initialValues={loginDetail}
          validationSchema={LoginSchema}
        >
          {(props: FormikProps<ILogin>): JSX.Element => (
            <form
              className={classes.layout}
              onSubmit={props.handleSubmit}
              onReset={props.handleReset}
            >
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Welcome please login
              </Typography>
              <LoginForm {...props} />
              <LoginButtons />
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};
