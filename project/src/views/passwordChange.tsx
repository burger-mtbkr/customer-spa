import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { Typography, Grid, Button, Container, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Tune from '@material-ui/icons/Tune';
import { makeStyles, CircularProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import LinearProgress from '@material-ui/core/LinearProgress';
import CancelSharp from '@material-ui/icons/CancelSharp';
import { IPasswordChangeRequest, PasswordChangeSchema } from '../models';
import { sessionUtil } from '../utils';
import { changePassword } from '../api';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
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
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  checkbox: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(2),
    width: 180,
  },
  buttonGrid: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export const PasswordChange = (): JSX.Element => {
  const jwtInfo = sessionUtil.getInfo();
  const classes = useStyles();
  const history = useHistory();
  const [saving, setSaving] = useState(false);
  const model = PasswordChangeSchema.default({}) as IPasswordChangeRequest;

  useEffect(() => {
    if (jwtInfo?.USER_ID) model.userId = jwtInfo?.USER_ID;
  }, [jwtInfo, model]);

  const onSubmit = async (
    model: IPasswordChangeRequest,
    actions: FormikHelpers<IPasswordChangeRequest>,
  ) => {
    setSaving(true);
    const result = await changePassword(model);
    actions.setSubmitting(false);
    setSaving(false);
    result ? history.goBack() : alert('Failed to update password');
  };

  const detailContent = (props: FormikProps<IPasswordChangeRequest>): JSX.Element => {
    return (
      <div className={classes.fieldSet}>
        <TextField
          onChange={props.handleChange}
          error={props.errors.oldPassword != null}
          helperText={props.errors.oldPassword}
          name="oldPassword"
          id="oldPassword"
          label="Old password"
          variant="outlined"
          type="password"
          value={props.values.oldPassword}
          className={classes.textField}
        />

        <TextField
          error={props.errors.newPassword != null}
          helperText={props.errors.newPassword}
          name="newPassword"
          id="newPassword"
          label="New passowrd"
          variant="outlined"
          type="password"
          value={props.values.newPassword}
          onChange={props.handleChange}
          className={classes.textField}
        />

        <TextField
          error={props.errors.confirmNewPassword != null}
          helperText={props.errors.confirmNewPassword}
          name="confirmNewPassword"
          id="confirmNewPassword"
          label="Confirm passowrd"
          variant="outlined"
          type="password"
          value={props.values.confirmNewPassword}
          onChange={props.handleChange}
          className={classes.textField}
        />
      </div>
    );
  };

  const formControls = (
    <Grid container className={classes.buttonGrid}>
      <Grid item xs>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          disabled={saving}
        >
          Submit
          {saving && <CircularProgress size={24} />}
        </Button>
      </Grid>
      <Grid item xs>
        <Link to="/userSettings">
          <Button disabled={saving} variant="contained" color="primary" startIcon={<CancelSharp />}>
            Cancel
          </Button>
        </Link>
      </Grid>
      {saving && <LinearProgress />}
    </Grid>
  );

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <div className={classes.layout}>
          <Typography component="h5" variant="h5">
            Change your password
          </Typography>
          <Avatar className={classes.avatar}>
            <Tune />
          </Avatar>
          <Formik<IPasswordChangeRequest>
            onSubmit={onSubmit}
            initialValues={model}
            validationSchema={PasswordChangeSchema}
          >
            {(props: FormikProps<IPasswordChangeRequest>): JSX.Element => (
              <form onSubmit={props.handleSubmit} onReset={props.handleReset}>
                {detailContent(props)}
                {formControls}
              </form>
            )}
          </Formik>
        </div>
      </Paper>
    </Container>
  );
};
