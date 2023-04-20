import { FormikProps } from 'formik';
import { TextField } from '@mui/material';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import { ILogin } from '../../models';

const useStyles = makeStyles(theme => ({
  fieldSet: {
    width: '70%',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
}));

export const LoginForm = ({ errors, handleChange }: FormikProps<ILogin>) => {
  const classes = useStyles();

  return (
    <div className={classes.fieldSet}>
      <TextField
        onChange={handleChange}
        error={errors.email != null}
        helperText={errors.email}
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
        onChange={handleChange}
        error={errors.password != null}
        helperText={errors.password}
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
            onChange={handleChange}
          />
        }
        label="Remember me"
      />
    </div>
  );
};
