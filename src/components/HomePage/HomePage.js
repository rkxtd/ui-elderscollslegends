import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PictureCard from '../../components/PictureCard';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 76,
    flexGrow: 1,
    maxWidth: 1280,
    margin: 'auto',
  },
  paper: {
    height: 340,
    width: 260,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
            <Grid key={value} item>
              <PictureCard className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
