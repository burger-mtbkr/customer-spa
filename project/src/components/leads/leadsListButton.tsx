import { Fab, Tooltip, makeStyles } from '@material-ui/core';
import LeadsIcon from '@mui/icons-material/AddIcCallSharp';
import { useHistory } from 'react-router-dom';
import { LEAD_LIST } from '../../routes/paths';

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

  return (
    <Tooltip title="View customer leads">
      <Fab
        color="primary"
        className={classes.fab}
        size="medium"
        aria-label="view customer leads"
        onClick={() => {
          history.push(LEAD_LIST);
        }}
      >
        <LeadsIcon />
      </Fab>
    </Tooltip>
  );
};
