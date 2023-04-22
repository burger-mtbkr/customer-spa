import { Select, MenuItem, InputLabel } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { ICustomer } from '../../models';
import React from 'react';
import { customerStatusDictionary } from './customerStatus';
import { FormattedMessage } from 'react-intl';

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
