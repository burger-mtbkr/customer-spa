import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';

import { ILead } from '../../models';
import { LeadStatusSelect } from './leadsStatusSelect';
import { useIntl } from 'react-intl';

interface ILeadsFormProps {
  leadToSave: ILead;
  register: UseFormRegister<ILead>;
  errors: FieldErrors<ILead>;
}

export const LeadForm = ({ leadToSave, register, errors }: ILeadsFormProps): JSX.Element => {
  const intl = useIntl();
  return (
    <>
      {leadToSave.id && <input type="hidden" value={leadToSave.id} {...register('id')} />}
      {leadToSave.customerId && (
        <input type="hidden" value={leadToSave.customerId} {...register('customerId')} />
      )}
      <Grid item xs={6} marginY={2}>
        <TextField
          type="text"
          label={intl.formatMessage({
            id: 'LEAD_NAME_LABEL',
            defaultMessage: 'Name',
          })}
          aria-label={intl.formatMessage({
            id: 'LEAD_NAME_LABEL',
            defaultMessage: 'Name',
          })}
          variant="outlined"
          defaultValue={leadToSave.name}
          InputLabelProps={{ shrink: true }}
          error={errors.name !== undefined}
          helperText={errors.name?.message}
          {...register('name', { required: true, maxLength: 25 })}
        />
      </Grid>
      <Grid item xs={6} marginY={2}>
        <TextField
          type="text"
          label={intl.formatMessage({
            id: 'LEAD_SOURCE_LABEL',
            defaultMessage: 'Source',
          })}
          aria-label={intl.formatMessage({
            id: 'LEAD_SOURCE_LABEL',
            defaultMessage: 'Source',
          })}
          variant="outlined"
          defaultValue={leadToSave.source}
          InputLabelProps={{ shrink: true }}
          error={errors.source !== undefined}
          helperText={errors.source?.message}
          {...register('source', { required: true, maxLength: 25 })}
        />
      </Grid>
      <Grid item xs={6} marginY={1}>
        <LeadStatusSelect model={leadToSave} register={register} />
      </Grid>
    </>
  );
};
