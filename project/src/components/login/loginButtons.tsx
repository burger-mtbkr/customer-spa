import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Item } from '../common/stackItem';
import LockOpenSharp from '@material-ui/icons/LockOpenSharp';
import { SIGNUP } from './../../routes/paths';
import SignupIcon from '@material-ui/icons/AddSharp';
import Stack from '@mui/joy/Stack';
import { loginInProgress } from '../../selectors';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
}));

export const LoginButtons = () => {
  let history = useHistory();
  const classes = useStyles();
  const intl = useIntl();
  const inProgress = useSelector(loginInProgress);

  const loginButtonLabel = intl.formatMessage({
    id: 'BUTTON_LOGIN',
    defaultMessage: 'Login',
  });

  const signUpButtonLabel = intl.formatMessage({
    id: 'BUTTON_SIGNUP',
    defaultMessage: 'Signup',
  });

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Item>
          <Button
            aria-label={loginButtonLabel}
            title={loginButtonLabel}
            disabled={inProgress}
            startIcon={<LockOpenSharp />}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loginButtonLabel}
          </Button>
        </Item>
        <Item>
          <Button
            startIcon={<SignupIcon />}
            aria-label={signUpButtonLabel}
            title={signUpButtonLabel}
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(SIGNUP);
            }}
          >
            {signUpButtonLabel}
          </Button>
        </Item>
      </Stack>
      {inProgress && <CircularProgress size={24} />}
    </>
  );
};
