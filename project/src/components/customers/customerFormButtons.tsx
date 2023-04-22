import { Button, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { ROOT } from '../../routes/paths';
import { Item } from '../common/stackItem';

export const CustomerFormButtons = (): JSX.Element => {
  const history = useHistory();
  return (
    <>
      <Stack direction="row" spacing={3} marginTop={2}>
        <Item>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Item>
        <Item>
          <Button variant="contained" type="reset">
            Reset
          </Button>
        </Item>
        <Item>
          <Button
            variant="contained"
            onClick={() => {
              history.replace(ROOT);
            }}
          >
            Cancel
          </Button>
        </Item>
      </Stack>
    </>
  );
};
