import React, { useEffect, useState, useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InfiniteScroll from "react-infinite-scroll-component";
import PictureCard from "../PictureCard";
import Spinner from "../Spinner";
import { Context as SearchContext } from "../../stores/SearchStore";
import {getCards} from "../../services/Cards";

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

async function loadMoreData(setStore, pageNum, searchTerm, flush = false) {
  if (flush) {
    pageNum = 1;
    setStore((oldStore) => ({...oldStore, hasMore: true, cards: []}));
  }
  const cards = await getCards({pageNum, searchTerm});
  if (flush) {
    setStore((oldStore) => ({...oldStore, cards, page: pageNum + 1}));
  } else {
    setStore((oldStore) => ({...oldStore, cards: [...oldStore.cards, ...cards], page: pageNum + 1}));
  }

  if (!cards.length) {
    setStore((oldStore) => ({...oldStore, hasMore: false}));
  }
}
export default function HomePage() {
  const classes = useStyles();
  const [cardsStore, setStore] = useState({ cards: [], page: 1, hasMore: true });
  const { store: SearchStore } = useContext(SearchContext);
  const scroll = useRef(null);

  useEffect(() => {
    scroll.current.el.scrollTo(0,0)
    loadMoreData(setStore, cardsStore.page, SearchStore.searchTerm, true);
  }, [SearchStore]);

  const fetchMoreData = async () => {
    return await loadMoreData(setStore, cardsStore.page, SearchStore.searchTerm);
  };
  return (
    <InfiniteScroll
      dataLength={cardsStore.cards.length}
      next={fetchMoreData}
      hasMore={cardsStore.hasMore}
      loader={<Spinner />}
      height={"100vh"}
      ref={scroll}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {cardsStore.cards.map(
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
