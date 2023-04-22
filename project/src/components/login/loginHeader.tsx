import Avatar from '@material-ui/core/Avatar';
import { FormattedMessage } from 'react-intl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

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
