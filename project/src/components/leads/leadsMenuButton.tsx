import { CUSTOMER_LIST, LEAD_ADD, LEAD_EDIT } from '../../routes/paths';
import { Fab, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import AddLeadIcon from '@mui/icons-material/AddSharp';
import BackIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import EditIcon from '@mui/icons-material/EditSharp';
import Tooltip from '@mui/material/Tooltip';
import { getSelectedLead } from '../../selectors';
import { setSelectedLeadAction } from '../../actions';
import { useHistory } from 'react-router-dom';
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

  const editLabel = intl.formatMessage({
    id: 'LEAD_EDIT_BUTTON_LABEL',
    defaultMessage: 'Edit lead details',
  });

  const addLabel = intl.formatMessage({
    id: 'LEAD_ADD_LABEL',
    defaultMessage: 'Add a new lead',
  });

  const backLabel = intl.formatMessage({
    id: 'LEAD_BACK_LABEL',
    defaultMessage: 'Back to customers',
  });

  return (
    <>
      {selectedLead && (
        <>
          <Tooltip title={editLabel}>
            <Fab
              color="primary"
              className={classes.fab}
              size="medium"
              aria-label={editLabel}
              onClick={() => {
                history.push(LEAD_EDIT);
              }}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
        </>
      )}
      <Tooltip title={addLabel}>
        <Fab
          color="primary"
          className={classes.fab}
          size="medium"
          aria-label={addLabel}
          onClick={() => {
            dispatch(setSelectedLeadAction(undefined));
            history.push(LEAD_ADD);
          }}
        >
          <AddLeadIcon />
        </Fab>
      </Tooltip>
      <Tooltip title={backLabel}>
        <Fab
          color="primary"
          className={classes.fab}
          size="medium"
          aria-label={backLabel}
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
