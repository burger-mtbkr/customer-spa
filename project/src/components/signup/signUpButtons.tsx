import { CircularProgress, Stack } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '@material-ui/core';
import CancelSharp from '@material-ui/icons/CancelSharp';
import { Item } from '../common/stackItem';
import { LOGIN } from '../../routes/paths';
import ResetSharpIcon from '@material-ui/icons/RestoreSharp';
import SignupIcon from '@material-ui/icons/AddSharp';
import { signupInProgress } from './../../selectors';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignupButtons = (): JSX.Element => {
  const history = useHistory();
  const intl = useIntl();
  const inProgress = useSelector(signupInProgress);

  const signUpButtonLabel = intl.formatMessage({
    id: 'BUTTON_SIGNUP',
    defaultMessage: 'Signup',
  });

  const resetButtonLabel = intl.formatMessage({
    id: 'BUTTON_RESET',
    defaultMessage: 'Reset',
  });

  const loginButtonLabel = intl.formatMessage({
    id: 'LOGIN_SIGNUP_BUTTON',
    defaultMessage: 'Back to login',
  });

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Item>
          <Button
            startIcon={<SignupIcon />}
            variant="contained"
            color="primary"
            type="submit"
            title={signUpButtonLabel}
            aria-label={signUpButtonLabel}
          >
            {signUpButtonLabel}
          </Button>
        </Item>
        <Item>
          <Button
            startIcon={<ResetSharpIcon />}
            variant="contained"
            color="primary"
            type="reset"
            aria-label={resetButtonLabel}
            title={resetButtonLabel}
          >
            {resetButtonLabel}
          </Button>
        </Item>
        <Item>
          <Button
            startIcon={<CancelSharp />}
            variant="contained"
            color="primary"
            aria-label={loginButtonLabel}
            title={loginButtonLabel}
            onClick={() => {
              history.replace(LOGIN);
            }}
          >
            {loginButtonLabel}
          </Button>
        </Item>
      </Stack>
      {inProgress && <CircularProgress size={24} />}
    </>
  );
};
export default SignupButtons;
