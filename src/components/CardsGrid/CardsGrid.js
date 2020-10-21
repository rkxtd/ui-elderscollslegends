import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import PictureCard from "../PictureCard";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 76,
    flexGrow: 1,
    maxWidth: 1280,
    margin: "auto",
  },
  error: {
    width: "100%",
    padding: 20,
  },
  paper: {
    height: 340,
    width: 260,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function CardsGrid({ cards, errorMessage }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      {errorMessage && (
        <Alert className={classes.error} severity="error">
          {errorMessage}
        </Alert>
      )}
      <Grid item xs={12}>
        <Grid container justify="center">
          {cards.map(
            ({
              id,
              imageUrl,
              name: cardName,
              type: cardType,
              text: cardText,
              set: { name: setName },
            }) => (
              <Grid key={id} item>
                <PictureCard
                  className={classes.paper}
                  imageUrl={imageUrl}
                  cardName={cardName}
                  cardText={cardText}
                  cardType={cardType}
                  setName={setName}
                />
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
