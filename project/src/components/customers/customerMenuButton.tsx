import { useHistory } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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
          <Tooltip title="Edit">
            <Fab
              color="primary"
              className={classes.fab}
              size="medium"
              aria-label="edit"
              onClick={() => {
                history.push('/editcustomer');
              }}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Delete">
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
      <Tooltip title="Add">
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
