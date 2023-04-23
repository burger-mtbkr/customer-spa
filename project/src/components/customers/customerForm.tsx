import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { CustomerStatusSelect } from './customerStatusSelect';
import { Grid } from '@mui/material';
import { ICustomer } from '../../models';
import { TextField } from '@material-ui/core';
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

  const firstNameLabel = intl.formatMessage({
    id: 'CUSTOMER_FIRST_NAME_LABEL',
    defaultMessage: 'First name',
  });

  const lastNameLabel = intl.formatMessage({
    id: 'CUSTOMER_LAST_NAME_LABEL',
    defaultMessage: 'Last name',
  });

  const emailLabel = intl.formatMessage({
    id: 'CUSTOMER_EMAIL_LABEL',
    defaultMessage: 'Last name',
  });

  const companyLabel = intl.formatMessage({
    id: 'CUSTOMER_COMPANY_LABEL',
    defaultMessage: 'Company',
  });

  const phoneLabel = intl.formatMessage({
    id: 'CUSTOMER_PHONE_LABEL',
    defaultMessage: 'Phone',
  });

  return (
    <>
      {customerToSave.id && <input type="hidden" value={customerToSave.id} {...register('id')} />}
      <Grid item xs={6} marginY={2}>
        <TextField
          type="text"
          label={firstNameLabel}
          title={firstNameLabel}
          aria-label={firstNameLabel}
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
          label={lastNameLabel}
          title={lastNameLabel}
          aria-label={lastNameLabel}
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
          label={emailLabel}
          title={emailLabel}
          aria-label={emailLabel}
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
          label={companyLabel}
          title={companyLabel}
          aria-label={companyLabel}
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
          label={phoneLabel}
          title={phoneLabel}
          aria-label={phoneLabel}
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
