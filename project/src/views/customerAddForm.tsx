import { Alert, Container, Grid, Paper } from '@mui/material';
import { CustomerSchema, ICustomer } from '../models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { CustomerForm } from '../components/customers/customerForm';
import { CustomerFormButtons } from '../components/customers/customerFormButtons';
import { FormTitle } from '../components/common/formTitle';
import PersonAddIcon from '@material-ui/icons/PersonAddSharp';
import { ROOT } from '../routes/paths';
import { getCustomerSaveResponse } from '../selectors';
import { makeStyles } from '@material-ui/core/styles';
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

export const CustomerAddForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const classes = useStyles();
  const [error, setError] = useState<string | Error | undefined>(undefined);
  const saveResponse = useSelector(getCustomerSaveResponse);

  const customerToSave = {
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    company: '',
    status: 0,
    createdDateUtc: new Date(),
  };

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
          id: 'CUSTOMER_SAVE_ERROR',
          defaultMessage: 'Failed to save. Please try again.',
        }),
      );
    }
  }, [saveResponse, history, intl]);

  return (
    <Container maxWidth="sm">
      <Paper className={classes.layout}>
        <FormTitle
          icon={<PersonAddIcon />}
          titleId={'CUSTOMER_ADD_TITLE'}
          defaultMessage="Add customer"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" justifyContent="center" spacing={1}>
            <CustomerForm customerToSave={customerToSave} register={register} errors={errors} />
            <CustomerFormButtons />
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
