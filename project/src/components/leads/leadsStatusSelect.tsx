import { InputLabel, MenuItem } from '@mui/material';

import { ILead } from '../../models';
import React from 'react';
import { Select } from '@material-ui/core';
import { UseFormRegister } from 'react-hook-form';
import { leadsStatusDictionary } from './leadStatus';
import { useIntl } from 'react-intl';

interface ILeadStatusSelectProps {
  model: ILead;
  register: UseFormRegister<ILead>;
}

export const LeadStatusSelect = ({ model, register }: ILeadStatusSelectProps): JSX.Element => {
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
          leadsStatusDictionary.map(record => (
            <MenuItem value={record.key}>{record.value}</MenuItem>
          )),
        )}
      </Select>
    </>
  );
};
