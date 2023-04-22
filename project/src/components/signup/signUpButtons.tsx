import { Button, CircularProgress, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Item } from '../common/stackItem';
import { signupInProgress } from './../../selectors';

const SignupButtons = (): JSX.Element => {
  const history = useHistory();
  const inProgress = useSelector(signupInProgress);

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Item>
          <Button variant="contained" type="submit">
            Signup
          </Button>
        </Item>
        <Item>
          <Button variant="contained" type="reset">
            Reset
          </Button>
        </Item>{' '}
        <Item>
          <Button
            variant="contained"
            onClick={() => {
              history.replace('/login');
            }}
          >
            Back to login
          </Button>
        </Item>
      </Stack>
      {inProgress && <CircularProgress size={24} />}
    </>
  );
};
export default SignupButtons;
