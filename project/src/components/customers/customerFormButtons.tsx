import { Button, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';

export const CustomerFormButtons = (): JSX.Element => {
  const history = useHistory();
  return (
    <Grid container xs={12} spacing={2} marginY={2} direction="row" justifyContent="center">
      <Grid item>
        <Button variant="contained" type="submit">
          Submit
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
            history.replace('/');
          }}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};
