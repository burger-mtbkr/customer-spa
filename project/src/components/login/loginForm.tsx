import { FormikProps } from 'formik';
import { Grid, TextField } from '@mui/material';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ILoginRequest } from '../../models';

export const LoginForm = ({ setFieldValue, errors, handleChange }: FormikProps<ILoginRequest>) => {
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('rememberLogin', event.target.checked);
  };

  return (
    <Grid container direction="column" justifyContent="center" spacing={0}>
      <Grid item xs={6} marginY={1}>
        <TextField
          onChange={handleChange}
          error={errors.email != null}
          helperText={errors.email}
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
      </Grid>
      <Grid item xs={6} marginY={1} spacing={0}>
        <TextField
          onChange={handleChange}
          error={errors.password != null}
          helperText={errors.password}
          variant="outlined"
          required
          fullWidth
          name={'password'}
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </Grid>
      <Grid item xs={6} marginY={1}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              id="rememberLogin"
              name="rememberLogin"
              onChange={handleCheckChange}
            />
          }
          label="Remember me"
        />
      </Grid>
    </Grid>
  );
};
