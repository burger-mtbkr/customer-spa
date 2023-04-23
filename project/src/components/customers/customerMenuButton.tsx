import { CUSTOMER_ADD, CUSTOMER_EDIT } from '../../routes/paths';
import { Fab, makeStyles } from '@material-ui/core';
import { setDeleteModalOpenAction, setSelectedCustomersAction } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import EditIcon from '@mui/icons-material/EditSharp';
import { LeadsListButton } from '../leads/leadsListButton';
import PersonAddIcon from '@material-ui/icons/PersonAddSharp';
import PersonPersonSharp from '@mui/icons-material/PersonRemoveSharp';
import Tooltip from '@mui/material/Tooltip';
import { getSelectedCustomers } from '../../selectors';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    width: '55px!important',
    height: '50px!important',
  },
}));

export const CustomerMenuButtons = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const intl = useIntl();
  const selectedCustomers = useSelector(getSelectedCustomers);

  const editLabel = intl.formatMessage({
    id: 'CUSTOMER_EDIT_LABEL',
    defaultMessage: 'Edit customer details',
  });

  const deleteLabel = intl.formatMessage({
    id: 'CUSTOMER_DELETE_LABEL',
    defaultMessage: 'Delete a details',
  });

  const addLabel = intl.formatMessage({
    id: 'CUSTOMER_ADD_LABEL',
    defaultMessage: 'Add a details',
  });

  return (
    <>
      {selectedCustomers.length === 1 && (
        <>
          <LeadsListButton />
          <Tooltip title={editLabel}>
            <Fab
              color="primary"
              className={classes.fab}
              size="medium"
              aria-label={editLabel}
              onClick={() => {
                history.push(CUSTOMER_EDIT);
              }}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
          <Tooltip title={deleteLabel}>
            <Fab
              color="primary"
              className={classes.fab}
              size="medium"
              aria-label={deleteLabel}
              onClick={() => dispatch(setDeleteModalOpenAction(true))}
            >
              <PersonPersonSharp />
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
            dispatch(setSelectedCustomersAction([]));
            history.push(CUSTOMER_ADD);
          }}
        >
          <PersonAddIcon />
        </Fab>
      </Tooltip>
    </>
  );
};
