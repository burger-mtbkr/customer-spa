import { CUSTOMER_LIST } from '../../routes/paths';
import { Divider } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LinkIcon from '@material-ui/icons/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleSharp from '@material-ui/icons/PeopleSharp';
import { makeStyles } from '@material-ui/core/styles';

const drawerStyle = makeStyles(theme => ({
  menuLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    display: 'block',
    '&:focus': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '& $primary, & $icon': {
        color: theme.palette.primary.light,
      },
    },
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '& $primary, & $icon': {
        color: theme.palette.primary.light,
      },
    },
  },
  iconColor: {
    color: theme.palette.primary.main,
  },
}));

export const MenuLinks = () => {
  const classes = drawerStyle();

  return (
    <>
      <ListItem button>
        <ListItemIcon>
          <PeopleSharp className={classes.iconColor} />
        </ListItemIcon>
        <Link to={CUSTOMER_LIST} className={classes.menuLink}>
          <ListItemText>
            <FormattedMessage id={'CUSTOMER_LIST_TITLE'} defaultMessage={'Customers'} />
          </ListItemText>
        </Link>
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <LinkIcon className={classes.iconColor} />
        </ListItemIcon>
        <a
          href="https://github.com/burger-mtbkr/customer-spa"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.menuLink}
        >
          <ListItemText>
            <FormattedMessage id={'MENU_GITHUB_LINK_LABEL'} defaultMessage={'Github'} />
          </ListItemText>
        </a>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon className={classes.iconColor} />
        </ListItemIcon>
        <a
          href="https://stackoverflow.com/users/3150426/tresponse"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.menuLink}
        >
          <ListItemText>
            <FormattedMessage
              id={'MENU_STACKOVERFLOW_LINK_LABEL'}
              defaultMessage={'Stack Overflow'}
            />
          </ListItemText>
        </a>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon className={classes.iconColor} />
        </ListItemIcon>
        <a
          href="https://github.com/burger-mtbkr/customer-service/tree/main"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.menuLink}
        >
          <ListItemText>
            <FormattedMessage id={'MENU_API_LINK_LABEL'} defaultMessage={'Customer service'} />
          </ListItemText>
        </a>
      </ListItem>
    </>
  );
};
