import { Fab, Tooltip, makeStyles } from '@material-ui/core';
import LeadsIcon from '@mui/icons-material/AddIcCallSharp';
import { useHistory } from 'react-router-dom';
import { LEAD_LIST } from '../../routes/paths';
import { useIntl } from 'react-intl';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    width: '55px!important',
    height: '50px!important',
  },
}));

export const LeadsListButton = () => {
  const history = useHistory();
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Tooltip
      title={intl.formatMessage({
        id: 'LEAD_VIEW_CUSTOMER_LEADS_TOOLTIP',
        defaultMessage: 'View customer leads',
      })}
    >
      <Fab
        color="primary"
        className={classes.fab}
        size="medium"
        aria-label={intl.formatMessage({
          id: 'LEAD_VIEW_CUSTOMER_LEADS_TOOLTIP',
          defaultMessage: 'View customer leads',
        })}
        onClick={() => {
          history.push(LEAD_LIST);
        }}
      >
        <LeadsIcon />
      </Fab>
    </Tooltip>
  );
};
