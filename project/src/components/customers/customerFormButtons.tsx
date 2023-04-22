import { Button, Stack } from '@mui/material';
import { FormattedMessage } from 'react-intl';
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
            <FormattedMessage id={'BUTTON_SUBMIT'} defaultMessage={'Submit'} />
          </Button>
        </Item>
        <Item>
          <Button variant="contained" type="reset">
            <FormattedMessage id={'BUTTON_RESET'} defaultMessage={'Reset'} />
          </Button>
        </Item>
        <Item>
          <Button
            variant="contained"
            onClick={() => {
              history.replace(ROOT);
            }}
          >
            <FormattedMessage id={'BUTTON_CANCEL'} defaultMessage={'Cancel'} />
          </Button>
        </Item>
      </Stack>
    </>
  );
};
