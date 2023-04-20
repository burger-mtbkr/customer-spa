import { TextField, Button, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { ICustomer, CustomerSchema } from '../models';
import { getCustomerSaveResponse, getEditCustomer } from '../selectors';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { saveCustomerAction } from '../actions';
import { CustomerStatusText } from '../enums';

const CustomerForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  let customerToSave = useSelector(getEditCustomer);
  const saveResponse = useSelector(getCustomerSaveResponse);

  if (!customerToSave) {
    customerToSave = {
      id: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      company: '',
      status: 0,
      createdDateUtc: new Date(),
    };
  }

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
        {customerToSave.id && <input type="hidden" value={customerToSave.id} {...register('id')} />}
        <Grid item xs={6} marginY={2}>
          <TextField
            type="text"
            label="First name"
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
            label="Last name"
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
            label="Email"
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
            label="Company"
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
            label="Phone"
            variant="outlined"
            defaultValue={customerToSave.phoneNumber}
            InputLabelProps={{ shrink: true }}
            error={errors.phoneNumber !== undefined}
            helperText={errors.phoneNumber?.message}
            {...register('phoneNumber', { required: true, maxLength: 20 })}
          />
        </Grid>
        <Grid item xs={6} marginY={1}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            defaultValue={customerToSave.status}
            labelId="status-label"
            {...register('status', { required: true })}
          >
            <MenuItem value={0}>{CustomerStatusText(0)}</MenuItem>
            <MenuItem value={1}>{CustomerStatusText(1)}</MenuItem>
            <MenuItem value={2}>{CustomerStatusText(2)}</MenuItem>
          </Select>
        </Grid>

        <Grid container xs={12} spacing={2} marginY={2} direction="row" justifyContent="center">
          <Grid item>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="reset">
              Reset
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                history.replace('/');
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default CustomerForm;
