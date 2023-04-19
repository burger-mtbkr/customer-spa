import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const Copyright = () => {
  return (
    <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="https://github.com/burger-mtbkr" target="_blank">
          {`Copyright © Burger-Mtbkr ${new Date().getFullYear()}.`}
        </Link>
      </Typography>
    </Box>
  );
};
export default Copyright;
