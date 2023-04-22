import { Button, CircularProgress, Stack } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../../routes/paths';
import { Item } from '../common/stackItem';
import { signupInProgress } from './../../selectors';

const SignupButtons = (): JSX.Element => {
  const history = useHistory();
  const intl = useIntl();
  const inProgress = useSelector(signupInProgress);

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Item>
          <Button
            variant="contained"
            type="submit"
            aria-label={intl.formatMessage({
              id: 'BUTTON_SIGNUP',
              defaultMessage: 'Signup',
            })}
          >
            <FormattedMessage id={'BUTTON_SIGNUP'} defaultMessage={'Signup'} />
          </Button>
        </Item>
        <Item>
          <Button
            variant="contained"
            type="reset"
            aria-label={intl.formatMessage({
              id: 'BUTTON_RESET',
              defaultMessage: 'Reset',
            })}
          >
            <FormattedMessage id={'BUTTON_RESET'} defaultMessage={'Reset'} />
          </Button>
        </Item>
        <Item>
          <Button
            variant="contained"
            aria-label={intl.formatMessage({
              id: 'LOGIN_SIGNUP_BUTTON',
              defaultMessage: 'Back to login',
            })}
            onClick={() => {
              history.replace(LOGIN);
            }}
          >
            <FormattedMessage id={'LOGIN_SIGNUP_BUTTON'} defaultMessage={'Back to login'} />
          </Button>
        </Item>
      </Stack>
      {inProgress && <CircularProgress size={24} />}
    </>
  );
};
export default SignupButtons;
