import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Paper, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { LockOpenSharp } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  layout: {
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
  fieldSet: {
    width: '70%',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
}));

export const UserSettings = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="subtitle1">
          User Settings
        </Typography>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={4}>
              <Grid item>
                <Button
                  startIcon={<LockOpenSharp />}
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push('/passwordChange');
                  }}
                >
                  Change password
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
