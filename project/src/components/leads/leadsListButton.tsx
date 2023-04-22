import { Fab, Tooltip, makeStyles } from '@material-ui/core';
import LeadsIcon from '@mui/icons-material/AddBusiness';
import { useHistory } from 'react-router-dom';

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
          history.push('/leads');
        }}
      >
        <LeadsIcon />
      </Fab>
    </Tooltip>
  );
};
