import { Button } from '@material-ui/core';
import CancelSharp from '@material-ui/icons/CancelSharp';
import { Item } from '../common/stackItem';
import ResetSharpIcon from '@material-ui/icons/RestoreSharp';
import SaveSharpIcon from '@material-ui/icons/SaveSharp';
import { Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

export const CustomerFormButtons = (): JSX.Element => {
  const history = useHistory();
  const intl = useIntl();

  const cancelButtonLabel = intl.formatMessage({
    id: 'BUTTON_CANCEL',
    defaultMessage: 'Cancel',
  });

  const submitButtonLabel = intl.formatMessage({
    id: 'BUTTON_SUBMIT',
    defaultMessage: 'Submit',
  });
  const resetButtonLabel = intl.formatMessage({
    id: 'BUTTON_RESET',
    defaultMessage: 'Reset',
  });

  return (
    <>
      <Stack direction="row" spacing={3} marginTop={2}>
        <Item>
          <Button
            startIcon={<SaveSharpIcon />}
            aria-label={submitButtonLabel}
            title={submitButtonLabel}
            variant="contained"
            color="primary"
            type="submit"
          >
            {submitButtonLabel}
          </Button>
        </Item>
        <Item>
          <Button
            startIcon={<ResetSharpIcon />}
            aria-label={resetButtonLabel}
            title={resetButtonLabel}
            variant="contained"
            color="primary"
            type="reset"
          >
            {resetButtonLabel}
          </Button>
        </Item>
        <Item>
          <Button
            startIcon={<CancelSharp />}
            variant="contained"
            color="primary"
            aria-label={cancelButtonLabel}
            title={cancelButtonLabel}
            onClick={() => {
              history.goBack();
            }}
          >
            {cancelButtonLabel}
          </Button>
        </Item>
      </Stack>
    </>
  );
};
