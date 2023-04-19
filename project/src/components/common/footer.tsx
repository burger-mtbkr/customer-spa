import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './copyright';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '40px',
    bottom: 0,
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={(classes.root, 'footer')}>
      <Copyright />
    </div>
  );
};

export default Footer;
