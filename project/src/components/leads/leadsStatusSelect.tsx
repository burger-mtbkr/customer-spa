import { InputLabel, MenuItem, Select } from '@mui/material';

import { FormattedMessage } from 'react-intl';
import { ILead } from '../../models';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { leadsStatusDictionary } from './leadStatus';

interface ILeadStatusSelectProps {
  model: ILead;
  register: UseFormRegister<ILead>;
}

export const LeadStatusSelect = ({ model, register }: ILeadStatusSelectProps): JSX.Element => {
  return (
    <>
      <InputLabel id="status-label">
        <FormattedMessage id={'LEAD_STATUS_LABEL'} defaultMessage={'Status'} />
      </InputLabel>
      <Select
        defaultValue={model.status}
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
