import { Container, Paper } from '@material-ui/core';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { IPasswordChangeRequest, PasswordChangeSchema } from '../models';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Alert } from '@mui/material';
import { ChangePasswordControls } from '../components/changePassword/ChangePasswordButtons';
import { ChangePasswordForm } from '../components/changePassword/ChangePaswordForm';
import { FormTitle } from '../components/common/formTitle';
import Tune from '@material-ui/icons/Tune';
import { changePassword } from '../api';
import { changePasswordAction } from '../actions';
import { getChangePasswordResponse } from './../selectors/passwordChange.selector';
import { makeStyles } from '@material-ui/core';
import { sessionUtil } from '../utils';
import { useHistory } from 'react-router-dom';

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
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
  textField: {
    margin: theme.spacing(2),
    width: 180,
  },
}));

export const PasswordChange = (): JSX.Element => {
  const jwtInfo = sessionUtil.getInfo();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const changePasswordResponse = useSelector(getChangePasswordResponse);
  const [error, setError] = useState<string | Error | undefined>(undefined);
  const model = PasswordChangeSchema.default({}) as IPasswordChangeRequest;

  useEffect(() => {
    if (jwtInfo?.USER_ID) model.userId = jwtInfo?.USER_ID;
  }, [jwtInfo, model]);

  useEffect(() => {
    if (changePasswordResponse) {
      changePasswordResponse.error
        ? setError('Failed to change the password.  Please try again')
        : history.goBack();
    }
  }, [history, changePasswordResponse]);

  const onSubmit = async (
    model: IPasswordChangeRequest,
    actions: FormikHelpers<IPasswordChangeRequest>,
  ) => {
    dispatch(changePasswordAction(model));

    const result = await changePassword(model);
    actions.setSubmitting(false);

    result ? history.goBack() : alert('Failed to update password');
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.layout}>
        <FormTitle
          icon={<Tune />}
          titleId={'CHANGE_PASSWORD_TITLE'}
          defaultMessage="Change your password"
        />
        <Formik<IPasswordChangeRequest>
          onSubmit={onSubmit}
          initialValues={model}
          validationSchema={PasswordChangeSchema}
        >
          {(props: FormikProps<IPasswordChangeRequest>): JSX.Element => (
            <>
              <form onSubmit={props.handleSubmit} onReset={props.handleReset}>
                <ChangePasswordForm {...props} />
                <ChangePasswordControls />
              </form>
              {error && <Alert severity="error">{error}</Alert>}
            </>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};
