import { Alert, Avatar, Container, Grid, Paper, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddLeadIcon from '@mui/icons-material/AddIcCallSharp';
import { getLeadSaveResponse } from './../selectors/leads.selectors';
import { ILead, LeadSchema } from './../models/lead.model';
import { saveLeadAction } from '../actions';
import { LeadForm } from '../components/leads/leadForm';
import { LeadFormButtons } from '../components/leads/leadFormButtons';
import { ROOT } from '../routes/paths';
import { getEditCustomer } from './../selectors/customer.selectors';
import { LEAD_LIST } from './../routes/paths';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  layout: {
    padding: theme.spacing(1),
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const LeadAddForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const saveResponse = useSelector(getLeadSaveResponse);
  const [error, setError] = useState<string | Error | undefined>(undefined);
  const selectedCustomer = useSelector(getEditCustomer);
  const [customerId, setCustomerId] = useState<string>('');

  useEffect(() => {
    if (!selectedCustomer || !selectedCustomer.id) {
      history.push(ROOT);
    } else {
      setCustomerId(selectedCustomer.id);
    }
  }, [history, selectedCustomer]);

  const leadModel = {
    id: '',
    customerId: customerId,
    name: '',
    source: '',
    status: 0,
    createdDateUtc: new Date(),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILead>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(LeadSchema),
  });

  const onSubmit: SubmitHandler<ILead> = (lead: ILead) => {
    dispatch(saveLeadAction(lead));
  };

  useEffect(() => {
    if (saveResponse?.isSuccessful === true) {
      history.push(LEAD_LIST);
    } else if (saveResponse?.isSuccessful === false) {
      setError('Failed to save.  Please try again');
    }
  }, [saveResponse, history]);

  return selectedCustomer ? (
    <Container maxWidth="sm">
      <Paper className={classes.layout}>
        <Avatar className={classes.avatar}>
          <AddLeadIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add customer lead {`for ${selectedCustomer?.firstName} ${selectedCustomer?.lastName}`}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" justifyContent="center" spacing={1}>
            <LeadForm leadToSave={leadModel} register={register} errors={errors} />
            <LeadFormButtons />
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>
        </form>
      </Paper>
    </Container>
  ) : (
    <Alert severity="error">{'No customer is selected. Please retry'}</Alert>
  );
};
