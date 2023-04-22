import { Typography } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

export const LoginHeader = () => {
  const classes = useStyles();
  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        <FormattedMessage id={'LOGIN_TITLE'} defaultMessage={'Welcome please login'} />
      </Typography>
    </>
  );
};
