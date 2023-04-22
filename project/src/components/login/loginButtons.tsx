import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '@mui/material';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Item } from '../common/stackItem';
import LockOpenSharp from '@material-ui/icons/LockOpenSharp';
import { SIGNUP } from './../../routes/paths';
import Stack from '@mui/joy/Stack';
import { loginInProgress } from '../../selectors';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Item>
          <Button
            aria-label={intl.formatMessage({
              id: 'BUTTON_LOGIN',
              defaultMessage: 'Login',
            })}
            disabled={inProgress}
            startIcon={<LockOpenSharp />}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <FormattedMessage id={'BUTTON_LOGIN'} defaultMessage={'Login'} />
          </Button>
        </Item>
        <Item>
          <Button
            aria-label={intl.formatMessage({
              id: 'BUTTON_SIGNUP',
              defaultMessage: 'Signup',
            })}
            variant="contained"
            onClick={() => {
              history.push(SIGNUP);
            }}
          >
            <FormattedMessage id={'BUTTON_SIGNUP'} defaultMessage={'Signup'} />
          </Button>
        </Item>
      </Stack>
      {inProgress && <CircularProgress size={24} />}
    </>
  );
};
