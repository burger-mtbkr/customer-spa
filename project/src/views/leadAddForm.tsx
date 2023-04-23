import { Alert, Container, Grid, Paper } from '@mui/material';
import { ILead, LeadSchema } from './../models/lead.model';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import AddLeadIcon from '@mui/icons-material/AddIcCallSharp';
import { FormTitle } from '../components/common/formTitle';
import { LEAD_LIST } from './../routes/paths';
import { LeadForm } from '../components/leads/leadForm';
import { LeadFormButtons } from '../components/leads/leadFormButtons';
import { ROOT } from '../routes/paths';
import { getEditCustomer } from './../selectors/customer.selectors';
import { getLeadSaveResponse } from './../selectors/leads.selectors';
import { makeStyles } from '@material-ui/core/styles';
import { saveLeadAction } from '../actions';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const intl = useIntl();
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
      setError(
        intl.formatMessage({
          id: 'CUSTOMER_LIST_TITLE',
          defaultMessage: 'Failed to save. Please try again.',
        }),
      );
    }
  }, [saveResponse, history, intl]);

  return selectedCustomer ? (
    <Container maxWidth="sm">
      <Paper className={classes.layout}>
        <FormTitle
          icon={<AddLeadIcon />}
          titleId={'LEAD_ADD_TITLE'}
          defaultMessage={'Add a lead for {customer}'}
          labelValues={{ customer: `${selectedCustomer.firstName} ${selectedCustomer.lastName}` }}
        />
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
