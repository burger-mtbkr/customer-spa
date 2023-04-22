import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { ISignup, SignupSchema } from '../models';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signUpAction } from '../actions';
import { getSignupResponse } from '../selectors/signup.selectors';
import SignupForm from '../components/signup/signupForm';
import SignupButtons from '../components/signup/signUpButtons';
import { Avatar, Container, Paper, Typography } from '@material-ui/core';
import { ROOT } from './../routes/paths';
import { Alert, Stack } from '@mui/material';
import { getSignupError } from '../errors';
import { FormattedMessage } from 'react-intl';

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
    if (signupResponse?.isSuccessful === true) {
      history.replace(ROOT);
    } else {
      setError(getSignupError(signupResponse));
    }
  }, [signupResponse, history]);

  return (
    <Container maxWidth="sm">
      <Paper className={classes.layout}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage id={'SIGN_UP_TITLE'} defaultMessage={'  Welcome please signup'} />
        </Typography>
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
