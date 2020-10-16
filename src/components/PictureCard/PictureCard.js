import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function PictureCard({
  imageUrl,
  cardName,
  cardText,
  cardType,
  setName,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={cardName}
          height="560"
          image={imageUrl}
          title={cardName}
        />
        <CardContent style={{ height: 202 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {cardName}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4">
            Type: {cardType}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4">
            Set: {setName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {cardText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
