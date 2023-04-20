import { Button, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';

const SignupButtons = (): JSX.Element => {
  const history = useHistory();
  return (
    <Grid container xs={12} spacing={2} marginY={2} direction="row" justifyContent="center">
      <Grid item>
        <Button variant="contained" type="submit">
          Signup
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" type="reset">
          Reset
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            history.replace('/login');
          }}
        >
          Back to login
        </Button>
      </Grid>
    </Grid>
  );
};
export default SignupButtons;
