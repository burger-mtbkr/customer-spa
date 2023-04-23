import { FormikProps } from 'formik';
import { Grid } from '@mui/material';
import { IPasswordChangeRequest } from '../../models';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(2),
    width: 180,
  },
}));

export const ChangePasswordForm = (props: FormikProps<IPasswordChangeRequest>) => {
  const intl = useIntl();
  const classes = useStyles();

  const oldPasswordLabel = intl.formatMessage({
    id: 'PASSWORD_OLD_LABEL',
    defaultMessage: 'Old password',
  });

  const newPasswordLabel = intl.formatMessage({
    id: 'PASSWORD_NEW_LABEL',
    defaultMessage: 'New password',
  });

  const confirmPasswordLabel = intl.formatMessage({
    id: 'PASSWORD_CONFIRM_LABEL',
    defaultMessage: 'Confirm password',
  });

  return (
    <Grid container direction="column" justifyContent="center" spacing={0} marginBottom={2}>
      <Grid item xs={6} marginY={1}>
        <TextField
          onChange={props.handleChange}
          error={props.errors.oldPassword != null}
          helperText={props.errors.oldPassword}
          name="oldPassword"
          id="oldPassword"
          aria-label={oldPasswordLabel}
          label={oldPasswordLabel}
          variant="outlined"
          type="password"
          value={props.values.oldPassword}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={6} marginY={1} spacing={0}>
        <TextField
          error={props.errors.newPassword != null}
          helperText={props.errors.newPassword}
          name="newPassword"
          id="newPassword"
          aria-label={newPasswordLabel}
          label={newPasswordLabel}
          variant="outlined"
          type="password"
          value={props.values.newPassword}
          onChange={props.handleChange}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={6} marginY={1}>
        <TextField
          error={props.errors.confirmNewPassword != null}
          helperText={props.errors.confirmNewPassword}
          name="confirmNewPassword"
          id="confirmNewPassword"
          aria-label={confirmPasswordLabel}
          label={confirmPasswordLabel}
          variant="outlined"
          type="password"
          value={props.values.confirmNewPassword}
          onChange={props.handleChange}
          className={classes.textField}
        />
      </Grid>
    </Grid>
  );
};
