import { TextField, Button, Grid } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { ISignup, SignupSchema } from '../models';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { signUpAction } from '../actions';
import { getSignupResponse } from '../selectors/signup.selectors';

const SignupForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const signupResponse = useSelector(getSignupResponse);

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
      history.push('/');
    } else if (signupResponse?.isSuccessful === false) {
      alert(`Failed to save`);
    }
  }, [signupResponse, history]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" justifyContent="center" spacing={1}>
        <Grid item xs={6} marginY={2}>
          <TextField
            type="text"
            label="First name"
            variant="outlined"
            defaultValue={signupModel.firstName}
            InputLabelProps={{ shrink: true }}
            error={errors.firstName !== undefined}
            helperText={errors.firstName?.message}
            {...register('firstName', { required: true, maxLength: 25 })}
          />
        </Grid>
        <Grid item xs={6} marginY={2}>
          <TextField
            type="text"
            label="Last name"
            variant="outlined"
            defaultValue={signupModel.lastName}
            InputLabelProps={{ shrink: true }}
            error={errors.lastName !== undefined}
            helperText={errors.lastName?.message}
            {...register('lastName', { required: true, maxLength: 25 })}
          />
        </Grid>
        <Grid item xs={6} marginY={2}>
          <TextField
            type="text"
            label="Email"
            variant="outlined"
            defaultValue={signupModel.email}
            InputLabelProps={{ shrink: true }}
            error={errors.email !== undefined}
            helperText={errors.email?.message}
            {...register('email', { required: true, maxLength: 25 })}
          />
        </Grid>
        <Grid item xs={6} marginY={2}>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            defaultValue={signupModel.password}
            InputLabelProps={{ shrink: true }}
            error={errors.password !== undefined}
            helperText={errors.password?.message}
            {...register('password', { required: true, maxLength: 25 })}
          />
        </Grid>
        <Grid item xs={6} marginY={2}>
          <TextField
            label="Confirm password"
            variant="outlined"
            type="password"
            defaultValue={signupModel.confirmPassword}
            InputLabelProps={{ shrink: true }}
            error={errors.confirmPassword !== undefined}
            helperText={errors.confirmPassword?.message}
            {...register('confirmPassword', { required: true, maxLength: 25 })}
          />
        </Grid>
      </Grid>

      <Grid container xs={12} spacing={2} marginY={2} direction="row" justifyContent="center">
        <Grid item>
          <Button variant="contained" type="submit">
            Signup
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" type="reset">
            Reset
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              history.replace('/login');
            }}
          >
            Back to login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default SignupForm;
