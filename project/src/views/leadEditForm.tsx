import { Alert, Avatar, Container, Grid, Paper, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { ILead, LeadSchema } from './../models/lead.model';
import { LEAD_LIST, ROOT } from '../routes/paths';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getLeadSaveResponse, getSelectedLead } from './../selectors/leads.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/EditSharp';
import { FormTitle } from '../components/common/formTitle';
import { LeadForm } from '../components/leads/leadForm';
import { LeadFormButtons } from '../components/leads/leadFormButtons';
import { getEditCustomer } from '../selectors';
import { makeStyles } from '@material-ui/core/styles';
import { saveLeadAction } from '../actions';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
  },
  layout: {
    padding: theme.spacing(1),
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const LeadEditForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const intl = useIntl();
  const selectedCustomer = useSelector(getEditCustomer);
  const saveResponse = useSelector(getLeadSaveResponse);
  const [error, setError] = useState<string | Error | undefined>(undefined);
  const leadToSave = useSelector(getSelectedLead);

  useEffect(() => {
    if (!leadToSave) {
      if (selectedCustomer) {
        history.replace(LEAD_LIST);
      } else {
        history.replace(ROOT);
      }
    }
  }, [leadToSave, history, selectedCustomer]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILead>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(LeadSchema),
  });

  const onSubmit: SubmitHandler<ILead> = (c: ILead) => {
    dispatch(saveLeadAction(c));
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

  return (
    <Container maxWidth="sm">
      <Paper className={classes.layout}>
        <FormTitle
          icon={<EditIcon />}
          titleId={'LEAD_EDIT_TITLE'}
          defaultMessage={'Edit the lead for {customer}'}
          labelValues={{ customer: `${selectedCustomer!.firstName} ${selectedCustomer!.lastName}` }}
        />
        {leadToSave ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" justifyContent="center" spacing={1}>
              <LeadForm leadToSave={leadToSave!} register={register} errors={errors} />
              <LeadFormButtons />
              {error && <Alert severity="error">{error}</Alert>}
            </Grid>
          </form>
        ) : null}
      </Paper>
    </Container>
  );
};
