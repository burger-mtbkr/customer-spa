import React, { useEffect, useState } from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { TextField, Button, Grid, Typography, Container, Paper } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { ILogin, LoginSchema } from '../models/login.model';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenSharp from '@material-ui/icons/LockOpenSharp';

import { loginRequest } from '../api';
import { storageUtil } from '../utils';

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
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
  fieldSet: {
    width: '70%',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
}));

export const Login = () => {
  let history = useHistory();
  const classes = useStyles();

  const loggedIn = storageUtil.getString('t');

  useEffect(() => {
    if (loggedIn) history.replace('/');
  }, [loggedIn, history]);

  const [loginDetail, setLoginDetail] = useState<ILogin>(LoginSchema.default({}) as ILogin);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const onReset = (): void => setLoginDetail(LoginSchema.default({}) as ILogin);

  const onSubmit = async (model: ILogin, actions: FormikHelpers<ILogin>) => {
    setIsAuthenticating(true);
    const token = await loginRequest(model);
    actions.setSubmitting(false);
    setIsAuthenticating(false);

    if (token) {
      history.replace('/');
    } else {
      alert('Login Failed.');
    }
  };

  const content = (props: FormikProps<ILogin>) => {
    return (
      <div className={classes.fieldSet}>
        <TextField
          onChange={props.handleChange}
          error={props.errors.email != null}
          helperText={props.errors.email}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          onChange={props.handleChange}
          error={props.errors.password != null}
          helperText={props.errors.password}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name={'password'}
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              color="primary"
              id="rememberLogin"
              name="rememberLogin"
              onChange={props.handleChange}
            />
          }
          label="Remember me"
        />
      </div>
    );
  };

  const formControls = (
    <div>
      <Grid container xs={12} spacing={2} marginY={2} direction="row" justifyContent="center">
        <Grid item>
          <Button
            disabled={isAuthenticating}
            startIcon={<LockOpenSharp />}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              history.replace('/signup');
            }}
          >
            Sign up!
          </Button>
        </Grid>
      </Grid>
      {isAuthenticating && <CircularProgress size={24} />}
    </div>
  );

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
              {content(props)}
              {formControls}
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};
