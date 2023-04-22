import { Button } from '@mui/material';
import Stack from '@mui/joy/Stack';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenSharp from '@material-ui/icons/LockOpenSharp';
import { useSelector } from 'react-redux';
import { loginInProgress } from '../../selectors';
import { Item } from '../common/stackItem';
import { SIGNUP } from './../../routes/paths';

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
      <Stack direction="row" spacing={3}>
        <Item>
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
        </Item>
        <Item>
          <Button
            variant="contained"
            onClick={() => {
              history.push(SIGNUP);
            }}
          >
            Sign up!
          </Button>
        </Item>
      </Stack>
      {inProgress && <CircularProgress size={24} />}
    </>
  );
};
