import { Alert, Stack } from '@mui/material';
import { Container, Paper } from '@material-ui/core';
import { ISignup, SignupSchema } from '../models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { FormTitle } from '../components/common/formTitle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { ROOT } from './../routes/paths';
import SignupButtons from '../components/signup/signUpButtons';
import SignupForm from '../components/signup/signupForm';
import { getLoginResponse } from './../selectors/session.selectors';
import { getSignupError } from '../errors';
import { getSignupResponse } from '../selectors/signup.selectors';
import { makeStyles } from '@material-ui/core/styles';
import { signUpAction } from '../actions';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  layout: {
    padding: theme.spacing(2),
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const Signup = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const signupResponse = useSelector(getSignupResponse);
  const loginResponse = useSelector(getLoginResponse);
  const [error, setError] = useState<string | Error | undefined>(undefined);
  const signupModel: ISignup = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<ISignup> = (c: ISignup) => {
    dispatch(signUpAction(c));
  };

  useEffect(() => {
    if (signupResponse?.error) {
      setError(getSignupError(signupResponse));
    } else if (loginResponse?.isLoggedIn) {
      history.replace(ROOT);
    }
  }, [signupResponse, loginResponse, history]);

  return (
    <Container maxWidth="sm">
      <Paper className={classes.layout}>
        <FormTitle
          icon={<PersonAddIcon />}
          titleId={'SIGN_UP_TITLE'}
          defaultMessage="Welcome please signup"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2} marginBottom={2}>
            <SignupForm errors={errors} register={register} model={signupModel} />
            <SignupButtons />
          </Stack>
        </form>
        {error && <Alert severity="error">{error}</Alert>}
      </Paper>
    </Container>
  );
};
