import { Grid } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { ICustomer, CustomerSchema } from '../models';
import { getCustomerSaveResponse } from '../selectors';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { saveCustomerAction } from '../actions';
import { CustomerFormButtons } from '../components/customers/customerFormButtons';
import { CustomerForm } from '../components/customers/customerForm';

export const CustomerAddForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      history.replace('/');
    } else if (saveResponse?.isSuccessful === false) {
      alert(`Failed to save`);
    }
  }, [saveResponse, history]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" justifyContent="center" spacing={1}>
        <CustomerForm customerToSave={customerToSave} register={register} errors={errors} />
        <CustomerFormButtons />
      </Grid>
    </form>
  );
};
