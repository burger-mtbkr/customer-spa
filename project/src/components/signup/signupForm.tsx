import { TextField, Button, Grid } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ISignup } from '../../models';
import { useHistory } from 'react-router-dom';

interface ISignupFormProps {
  model: ISignup;
  register: UseFormRegister<ISignup>;
  errors: FieldErrors<ISignup>;
}

const SignupForm = ({ model, register, errors }: ISignupFormProps): JSX.Element => {
  const history = useHistory();
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={1}>
        <Grid item xs={6} marginY={2}>
          <TextField
            type="text"
            label="First name"
            variant="outlined"
            defaultValue={model.firstName}
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
            defaultValue={model.lastName}
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
            defaultValue={model.email}
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
            defaultValue={model.password}
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
            defaultValue={model.confirmPassword}
            InputLabelProps={{ shrink: true }}
            error={errors.confirmPassword !== undefined}
            helperText={errors.confirmPassword?.message}
            {...register('confirmPassword', { required: true, maxLength: 25 })}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default SignupForm;
