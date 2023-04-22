import { Alert, Avatar, Container, Grid, Paper, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAddSharp';
import { ICustomer, CustomerSchema } from '../models';
import { getCustomerSaveResponse } from '../selectors';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { saveCustomerAction } from '../actions';
import { CustomerFormButtons } from '../components/customers/customerFormButtons';
import { CustomerForm } from '../components/customers/customerForm';
import { ROOT } from '../routes/paths';
import { FormattedMessage, useIntl } from 'react-intl';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
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
          id: 'CUSTOMER_LIST_TITLE',
          defaultMessage: 'Failed to save. Please try again.',
        }),
      );
    }
  }, [saveResponse, history, intl]);

  return (
    <Container maxWidth="sm">
      <Paper className={classes.layout}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage id="CUSTOMER_ADD_TITLE" defaultMessage="Add customer" />
        </Typography>
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
