import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InfiniteScroll from 'react-infinite-scroll-component';
import PictureCard from "../PictureCard";
import Spinner from "../Spinner";
import axios from "axios";

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
  }
}));

async function loadMoreData(setCards, setPage, page) {
  const pageSize = 20;
  const {
    data: { cards },
  } = await axios(
    `https://api.elderscrollslegends.io/v1/cards?pageSize=${pageSize}&page=${page}`
  );
  setCards(oldCards => [...oldCards, ...cards]);
  setPage(page + 1);
}
export default function HomePage() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMoreData(setCards, setPage, page);
  }, []);

  const fetchMoreData = async () => {
    return await loadMoreData(setCards, setPage, page);
  }
  return (
          <InfiniteScroll
            dataLength={cards.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<Spinner />}
            height={'100vh'}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
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

          </InfiniteScroll>

  );
}
