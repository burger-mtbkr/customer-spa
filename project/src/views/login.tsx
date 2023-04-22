import React, { useEffect, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { Typography, Container, Paper, Alert, Stack } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { ILoginRequest, LoginSchema } from '../models/login.model';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../actions';
import { getLoginResponse } from '../selectors/session.selectors';
import { LoginForm } from '../components/login/loginForm';
import { LoginButtons } from '../components/login/loginButtons';
import { getLoginError } from '../utils';
import { ROOT } from './../routes/paths';
import { FormattedMessage, useIntl } from 'react-intl';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  layout: {
    padding: theme.spacing(1),
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
}));

export const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const intl = useIntl();
  const classes = useStyles();
  const loginResponse = useSelector(getLoginResponse);
  const [error, setError] = useState<string | Error | undefined>(undefined);

  useEffect(() => {
    if (loginResponse?.isLoggedIn) {
      history.replace(ROOT);
    } else {
      setError(getLoginError(loginResponse, intl));
    }
  }, [loginResponse, history, intl]);

  const [loginDetail, setLoginDetail] = useState<ILoginRequest>(
    LoginSchema.default({}) as ILoginRequest,
  );

  const onReset = (): void => setLoginDetail(LoginSchema.default({}) as ILoginRequest);

  const onSubmit = async (model: ILoginRequest) => {
    dispatch(loginAction(model));
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.layout}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage id={'LOGIN_TITLE'} defaultMessage={'Welcome please login'} />
        </Typography>
        <Formik<ILoginRequest>
          onSubmit={onSubmit}
          onReset={onReset}
          initialValues={loginDetail}
          validationSchema={LoginSchema}
        >
          {(props: FormikProps<ILoginRequest>): JSX.Element => (
            <>
              <form onSubmit={props.handleSubmit} onReset={props.handleReset}>
                <Stack direction="column" spacing={2} marginBottom={2}>
                  <LoginForm {...props} />
                  <LoginButtons />
                </Stack>
              </form>
              {error && <Alert severity="error">{error}</Alert>}
            </>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};
