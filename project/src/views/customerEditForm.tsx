import { Alert, Grid } from '@mui/material';
import { Container, Paper, makeStyles } from '@material-ui/core';
import { CustomerSchema, ICustomer } from '../models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getCustomerSaveResponse, getEditCustomer } from '../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { CustomerForm } from '../components/customers/customerForm';
import { CustomerFormButtons } from '../components/customers/customerFormButtons';
import EditIcon from '@mui/icons-material/EditSharp';
import { FormTitle } from '../components/common/formTitle';
import { ROOT } from '../routes/paths';
import { saveCustomerAction } from '../actions';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
  },
  layout: {
    padding: theme.spacing(1),
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const CustomerEditForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const intl = useIntl();
  const [error, setError] = useState<string | Error | undefined>(undefined);
  const customerToSave = useSelector(getEditCustomer);
  const saveResponse = useSelector(getCustomerSaveResponse);

  useEffect(() => {
    if (!customerToSave) history.replace(ROOT);
  }, [customerToSave, history]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICustomer>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(CustomerSchema),
  });

  const onSubmit: SubmitHandler<ICustomer> = (c: ICustomer) => {
    dispatch(saveCustomerAction(c));
  };

  useEffect(() => {
    if (saveResponse?.isSuccessful === true) {
      history.replace(ROOT);
    } else if (saveResponse?.isSuccessful === false) {
      setError(
        intl.formatMessage({
          id: 'CUSTOMER_LIST_TITLE',
          defaultMessage: 'Failed to save. Please try again.',
        }),
      );
    }
  }, [saveResponse, history, intl]);

  return (
    <Container maxWidth="sm">
      <Paper className={classes.layout}>
        <FormTitle
          icon={<EditIcon />}
          titleId={'CUSTOMER_EDIT_TITLE'}
          defaultMessage="Edit the customer"
        />
        {customerToSave ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" justifyContent="center" spacing={1}>
              <CustomerForm customerToSave={customerToSave!} register={register} errors={errors} />
              <CustomerFormButtons />
              {error && <Alert severity="error">{error}</Alert>}
            </Grid>
          </form>
        ) : null}
      </Paper>
    </Container>
  );
};
