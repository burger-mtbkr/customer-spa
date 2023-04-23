import { Avatar } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { primaryMainColor } from '../../theme';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: `${primaryMainColor}!important`,
  },
}));

interface IFormTitleProps {
  icon: ReactNode;
  titleId: string;
  defaultMessage: string;
  labelValues?: Record<string, any>;
}

export const FormTitle = ({ icon, titleId, defaultMessage, labelValues }: IFormTitleProps) => {
  const classes = useStyles();

  return (
    <>
      <Avatar color="primary" className={classes.avatar}>
        {icon}
      </Avatar>
      <Typography component="h1" variant="h5">
        <FormattedMessage id={titleId} defaultMessage={defaultMessage} values={labelValues} />
      </Typography>
    </>
  );
};
