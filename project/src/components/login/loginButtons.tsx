import { Button, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenSharp from '@material-ui/icons/LockOpenSharp';
import { useSelector } from 'react-redux';
import { loginInProgress } from '../../selectors';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
}));

export const LoginButtons = () => {
  let history = useHistory();
  const classes = useStyles();
  const inProgress = useSelector(loginInProgress);

  return (
    <>
      <Grid container xs={12} spacing={2} marginY={2} direction="row" justifyContent="center">
        <Grid item>
          <Button
            disabled={inProgress}
            startIcon={<LockOpenSharp />}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              history.replace('/signup');
            }}
          >
            Sign up!
          </Button>
        </Grid>
      </Grid>
      {inProgress && <CircularProgress size={24} />}
    </>
  );
};
