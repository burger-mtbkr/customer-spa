import { useHistory } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/DeleteSharp';
import AddIcon from '@mui/icons-material/AddSharp';
import DetailsIcon from '@mui/icons-material/DescriptionSharp';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedCustomers } from '../../selectors';
import { setDeleteModalOpenAction, setSelectedCustomersAction } from '../../actions';
import { Fab, makeStyles } from '@material-ui/core';

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
  const selectedCustomers = useSelector(getSelectedCustomers);

  return (
    <>
      {selectedCustomers.length === 1 && (
        <>
          <Tooltip title="View customer details">
            <Fab
              color="primary"
              className={classes.fab}
              size="medium"
              aria-label="view customer details"
              onClick={() => {
                history.push('/customerdetails');
              }}
            >
              <DetailsIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Delete a customer">
            <Fab
              color="primary"
              className={classes.fab}
              size="medium"
              aria-label="delete"
              onClick={() => dispatch(setDeleteModalOpenAction(true))}
            >
              <DeleteIcon />
            </Fab>
          </Tooltip>
        </>
      )}
      <Tooltip title="Add a new customer">
        <Fab
          color="primary"
          className={classes.fab}
          size="medium"
          aria-label="add"
          onClick={() => {
            dispatch(setSelectedCustomersAction([]));
            history.push('/addcustomer');
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
};
