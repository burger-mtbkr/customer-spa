import { Alert, Avatar, Container, Grid, Paper, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@mui/icons-material/EditSharp';
import { getLeadSaveResponse, getSelectedLead } from './../selectors/leads.selectors';
import { ILead, LeadSchema } from './../models/lead.model';
import { saveLeadAction } from '../actions';
import { LeadForm } from '../components/leads/leadForm';
import { LeadFormButtons } from '../components/leads/leadFormButtons';
import { LEAD_LIST } from '../routes/paths';
import { useIntl, FormattedMessage } from 'react-intl';

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
  const saveResponse = useSelector(getLeadSaveResponse);
  const [error, setError] = useState<string | Error | undefined>(undefined);
  const leadToSave = useSelector(getSelectedLead);

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
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage id="LEAD_EDIT_TITLE" defaultMessage="Edit customer lead" />
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" justifyContent="center" spacing={1}>
            <LeadForm leadToSave={leadToSave!} register={register} errors={errors} />
            <LeadFormButtons />
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
