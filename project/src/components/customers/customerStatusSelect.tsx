import { InputLabel, MenuItem, Select } from '@mui/material';

import { FormattedMessage } from 'react-intl';
import { ICustomer } from '../../models';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { customerStatusDictionary } from './customerStatus';

interface ICustomerStatusSelectProps {
  model: ICustomer;
  register: UseFormRegister<ICustomer>;
}

export const CustomerStatusSelect = ({
  model,
  register,
}: ICustomerStatusSelectProps): JSX.Element => {
  return (
    <>
      <InputLabel id="status-label">
        <FormattedMessage id={'CUSTOMER_STATUS_LABEL'} defaultMessage={'Status'} />
      </InputLabel>
      <Select
        defaultValue={model.status}
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
