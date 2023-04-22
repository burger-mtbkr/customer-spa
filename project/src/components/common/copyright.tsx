import { Box, Link, Typography } from '@mui/material';

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
