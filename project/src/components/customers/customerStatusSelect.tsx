import { InputLabel, MenuItem } from '@mui/material';

import { ICustomer } from '../../models';
import React from 'react';
import { Select } from '@material-ui/core';
import { UseFormRegister } from 'react-hook-form';
import { customerStatusDictionary } from './customerStatus';
import { useIntl } from 'react-intl';

interface ICustomerStatusSelectProps {
  model: ICustomer;
  register: UseFormRegister<ICustomer>;
}

export const CustomerStatusSelect = ({
  model,
  register,
}: ICustomerStatusSelectProps): JSX.Element => {
  const intl = useIntl();

  const statusLabel = intl.formatMessage({
    id: 'CUSTOMER_STATUS_LABEL',
    defaultMessage: 'Status',
  });

  return (
    <>
      <InputLabel id="status-label">{statusLabel}</InputLabel>
      <Select
        color="primary"
        variant="outlined"
        defaultValue={model.status}
        title={statusLabel}
        aria-label={statusLabel}
        labelId="status-label"
        {...register('status', { required: true })}
      >
        {React.Children.toArray(
          customerStatusDictionary.map(record => (
            <MenuItem value={record.key}>{record.value}</MenuItem>
          )),
        )}
      </Select>
    </>
  );
};
