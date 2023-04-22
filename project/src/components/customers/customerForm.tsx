import { TextField, Grid } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ICustomer } from '../../models';
import { CustomerStatusSelect } from './customerStatusSelect';
import { useIntl } from 'react-intl';

interface ICustomerFormProps {
  customerToSave: ICustomer;
  register: UseFormRegister<ICustomer>;
  errors: FieldErrors<ICustomer>;
}

export const CustomerForm = ({
  customerToSave,
  register,
  errors,
}: ICustomerFormProps): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      {customerToSave.id && <input type="hidden" value={customerToSave.id} {...register('id')} />}
      <Grid item xs={6} marginY={2}>
        <TextField
          type="text"
          label={intl.formatMessage({
            id: 'CUSTOMER_FIRST_NAME_LABEL',
            defaultMessage: 'First name',
          })}
          variant="outlined"
          defaultValue={customerToSave.firstName}
          InputLabelProps={{ shrink: true }}
          error={errors.firstName !== undefined}
          helperText={errors.firstName?.message}
          {...register('firstName', { required: true, maxLength: 25 })}
        />
      </Grid>
      <Grid item xs={6} marginY={2}>
        <TextField
          type="text"
          label={intl.formatMessage({
            id: 'CUSTOMER_LAST_NAME_LABEL',
            defaultMessage: 'Last name',
          })}
          variant="outlined"
          defaultValue={customerToSave.lastName}
          InputLabelProps={{ shrink: true }}
          error={errors.lastName !== undefined}
          helperText={errors.lastName?.message}
          {...register('lastName', { required: true, maxLength: 25 })}
        />
      </Grid>
      <Grid item xs={6} marginY={2}>
        <TextField
          type="text"
          label={intl.formatMessage({
            id: 'CUSTOMER_EMAIL_LABEL',
            defaultMessage: 'Last name',
          })}
          variant="outlined"
          defaultValue={customerToSave.email}
          InputLabelProps={{ shrink: true }}
          error={errors.email !== undefined}
          helperText={errors.email?.message}
          {...register('email', { required: true, maxLength: 25 })}
        />
      </Grid>
      <Grid item xs={6} marginY={2}>
        <TextField
          type="text"
          label={intl.formatMessage({
            id: 'CUSTOMER_COMPANY_LABEL',
            defaultMessage: 'Company',
          })}
          variant="outlined"
          defaultValue={customerToSave.company}
          InputLabelProps={{ shrink: true }}
          error={errors.company !== undefined}
          helperText={errors.company?.message}
          {...register('company', { required: true, maxLength: 25 })}
        />
      </Grid>
      <Grid item xs={6} marginY={2}>
        <TextField
          type="text"
          label={intl.formatMessage({
            id: 'CUSTOMER_PHONE_LABEL',
            defaultMessage: 'Phone',
          })}
          variant="outlined"
          defaultValue={customerToSave.phoneNumber}
          InputLabelProps={{ shrink: true }}
          error={errors.phoneNumber !== undefined}
          helperText={errors.phoneNumber?.message}
          {...register('phoneNumber', { required: true, maxLength: 20 })}
        />
      </Grid>
      <Grid item xs={6} marginY={1}>
        <CustomerStatusSelect model={customerToSave} register={register} />
      </Grid>
    </>
  );
};
