import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    margin: 10,
    position: "relative",
    "&:hover .content": {
      display: "block",
    },
    "&:hover content": {
      display: "block",
    },
    "&:hover": {
      "& $content": {
        height: 200,
      },
    },
  },
  content: {
    position: "absolute",
    bottom: 0,
    padding: "10px 16px",
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    opacity: ".85",
    width: "100%",
    height: 50,
    transition: "transform 0.5s",
    transitionProperty: "all",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
}));

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
      <CardMedia
        component="img"
        alt={cardName}
        height="560"
        image={imageUrl}
        title={cardName}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h3">
          {cardName}
        </Typography>
        <Typography gutterBottom variant="h6" component="h4">
          {cardType} / {setName}
        </Typography>
        <Typography variant="body2" component="p">
          {cardText}
        </Typography>
      </CardContent>
    </Card>
  );
}
