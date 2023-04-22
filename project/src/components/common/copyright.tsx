import { Box, Link, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const Copyright = () => {
  return (
    <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="https://github.com/burger-mtbkr" target="_blank">
          <FormattedMessage
            id="COPYRIGHT_TEXT"
            defaultMessage="Copyright © Burger-Mtbkr"
            values={{ year: new Date().getFullYear() }}
          />
        </Link>
      </Typography>
    </Box>
  );
};
export default Copyright;
