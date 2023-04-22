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

  return (
    <>
      {selectedLead && (
        <>
          <Tooltip title="Edit lead details">
            <Fab
              color="primary"
              className={classes.fab}
              size="medium"
              aria-label="Edit customer lead"
              onClick={() => {
                history.push(LEAD_EDIT);
              }}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
        </>
      )}
      <Tooltip title="Add a new lead">
        <Fab
          color="primary"
          className={classes.fab}
          size="medium"
          aria-label="add"
          onClick={() => {
            dispatch(setSelectedLeadAction(undefined));
            history.push(LEAD_ADD);
          }}
        >
          <AddLeadIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Back to customers">
        <Fab
          color="primary"
          className={classes.fab}
          size="medium"
          aria-label="back"
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
