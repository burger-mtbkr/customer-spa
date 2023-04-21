import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import PeopleSharp from '@material-ui/icons/PeopleSharp';
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';
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
        <Link to="/customers" className={classes.menuLink}>
          <ListItemText>Customers</ListItemText>
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
          <ListItemText>Github</ListItemText>
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
          <ListItemText>Stack Overflow</ListItemText>
        </a>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon className={classes.iconColor} />
        </ListItemIcon>
        <a
          href="http://customerservice-dev.eba-rm6agvep.ap-southeast-2.elasticbeanstalk.com/swagger/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.menuLink}
        >
          <ListItemText>Customer service</ListItemText>
        </a>
      </ListItem>
    </>
  );
};