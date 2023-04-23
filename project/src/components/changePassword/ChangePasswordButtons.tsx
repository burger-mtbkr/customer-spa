import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '@material-ui/core';
import CancelSharp from '@material-ui/icons/CancelSharp';
import { Item } from '../../components/common/stackItem';
import SaveIcon from '@material-ui/icons/Save';
import { Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';

export const ChangePasswordControls = () => {
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

  return (
    <Stack direction="row" spacing={3} marginBottom={2}>
      <Item>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          title={submitButtonLabel}
          aria-label={submitButtonLabel}
          startIcon={<SaveIcon />}
        >
          <FormattedMessage id={'BUTTON_SUBMIT'} defaultMessage={'Submit'} />
        </Button>
      </Item>
      <Item>
        <Button
          startIcon={<CancelSharp />}
          title={cancelButtonLabel}
          aria-label={cancelButtonLabel}
          variant="contained"
          color="primary"
          onClick={() => {
            history.goBack();
          }}
        >
          <FormattedMessage id={'BUTTON_CANCEL'} defaultMessage={'Cancel'} />
        </Button>
      </Item>
    </Stack>
  );
};
