import Grid from "@material-ui/core/Grid";
import PictureCard from "../PictureCard";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 76,
    flexGrow: 1,
    maxWidth: 1280,
    margin: "auto",
  },
  paper: {
    height: 340,
    width: 260,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function CardsGrid({ cards }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
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
          {!cards.length && (
            <Grid item>
              <p>Looks like there are no cards!</p>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
