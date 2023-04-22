import { Select, MenuItem, InputLabel } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { ILead } from '../../models';
import React from 'react';
import { leadsStatusDictionary } from './leadStatus';

interface ILeadStatusSelectProps {
  model: ILead;
  register: UseFormRegister<ILead>;
}

export const LeadStatusSelect = ({ model, register }: ILeadStatusSelectProps): JSX.Element => {
  return (
    <>
      <InputLabel id="status-label">Status</InputLabel>
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
