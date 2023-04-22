import { useHistory } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import PersonPersonSharp from '@mui/icons-material/PersonRemoveSharp';
import PersonAddIcon from '@material-ui/icons/PersonAddSharp';
import EditIcon from '@mui/icons-material/EditSharp';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedCustomers } from '../../selectors';
import { setDeleteModalOpenAction, setSelectedCustomersAction } from '../../actions';
import { Fab, makeStyles } from '@material-ui/core';
import { LeadsListButton } from '../leads/leadsListButton';
import { CUSTOMER_ADD, CUSTOMER_EDIT } from '../../routes/paths';
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

  return (
    <>
      {selectedCustomers.length === 1 && (
        <>
          <LeadsListButton />
          <Tooltip
            title={intl.formatMessage({
              id: 'CUSTOMER_EDIT_LABEL',
              defaultMessage: 'Edit customer details',
            })}
          >
            <Fab
              color="primary"
              className={classes.fab}
              size="medium"
              aria-label={intl.formatMessage({
                id: 'CUSTOMER_EDIT_LABEL',
                defaultMessage: 'Edit customer details',
              })}
              onClick={() => {
                history.push(CUSTOMER_EDIT);
              }}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage({
              id: 'CUSTOMER_DELETE_LABEL',
              defaultMessage: 'Delete a details',
            })}
          >
            <Fab
              color="primary"
              className={classes.fab}
              size="medium"
              aria-label={intl.formatMessage({
                id: 'CUSTOMER_DELETE_LABEL',
                defaultMessage: 'Delete a details',
              })}
              onClick={() => dispatch(setDeleteModalOpenAction(true))}
            >
              <PersonPersonSharp />
            </Fab>
          </Tooltip>
        </>
      )}
      <Tooltip
        title={intl.formatMessage({
          id: 'CUSTOMER_ADD_LABEL',
          defaultMessage: 'Add a details',
        })}
      >
        <Fab
          color="primary"
          className={classes.fab}
          size="medium"
          aria-label={intl.formatMessage({
            id: 'CUSTOMER_ADD_LABEL',
            defaultMessage: 'Add a details',
          })}
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
