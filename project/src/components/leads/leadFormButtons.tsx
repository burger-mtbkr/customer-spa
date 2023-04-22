import { Button, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Item } from '../common/stackItem';
import { LEAD_LIST } from './../../routes/paths';

export const LeadFormButtons = (): JSX.Element => {
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
              history.replace(LEAD_LIST);
            }}
          >
            Cancel
          </Button>
        </Item>
      </Stack>
    </>
  );
};
