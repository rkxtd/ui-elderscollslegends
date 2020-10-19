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
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
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
