import { useHistory } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import AddLeadIcon from '@mui/icons-material/AddSharp';
import EditIcon from '@mui/icons-material/EditSharp';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedLead } from '../../selectors';
import { setSelectedLeadAction } from '../../actions';
import { Fab, makeStyles } from '@material-ui/core';
import BackIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { CUSTOMER_LIST, LEAD_ADD, LEAD_EDIT } from '../../routes/paths';

import { useIntl } from 'react-intl';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    width: '55px!important',
    height: '50px!important',
  },
}));

export const LeadsMenuButtons = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedLead = useSelector(getSelectedLead);
  const intl = useIntl();

  return (
    <>
      {selectedLead && (
        <>
          <Tooltip
            title={intl.formatMessage({
              id: 'LEAD_EDIT_LABEL',
              defaultMessage: 'Edit lead details',
            })}
          >
            <Fab
              color="primary"
              className={classes.fab}
              size="medium"
              aria-label={intl.formatMessage({
                id: 'LEAD_EDIT_LABEL',
                defaultMessage: 'Edit lead details',
              })}
              onClick={() => {
                history.push(LEAD_EDIT);
              }}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
        </>
      )}
      <Tooltip
        title={intl.formatMessage({
          id: 'LEAD_ADD_LABEL',
          defaultMessage: 'Add a new lea',
        })}
      >
        <Fab
          color="primary"
          className={classes.fab}
          size="medium"
          aria-label={intl.formatMessage({
            id: 'LEAD_ADD_LABEL',
            defaultMessage: 'Add a new lead',
          })}
          onClick={() => {
            dispatch(setSelectedLeadAction(undefined));
            history.push(LEAD_ADD);
          }}
        >
          <AddLeadIcon />
        </Fab>
      </Tooltip>
      <Tooltip
        title={intl.formatMessage({
          id: 'LEAD_BACK_LABEL',
          defaultMessage: 'Back to customers',
        })}
      >
        <Fab
          color="primary"
          className={classes.fab}
          size="medium"
          aria-label={intl.formatMessage({
            id: 'LEAD_BACK_LABEL',
            defaultMessage: 'Back to customers',
          })}
          onClick={() => {
            dispatch(setSelectedLeadAction(undefined));
            history.push(CUSTOMER_LIST);
          }}
        >
          <BackIcon />
        </Fab>
      </Tooltip>
    </>
  );
};
