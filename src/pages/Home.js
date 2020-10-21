import React, { useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import CardsGrid from "../components/CardsGrid";
import Spinner from "../components/Spinner";
import { Context as CardsContext } from "../stores/Cards";
import { useCardsApiRequest } from "../hooks/Cards";

const CARDS_PER_PAGE = 20;

export default function Home() {
  const {
    store: { searchTerm: inputSearchTerm },
  } = useContext(CardsContext);
  const [
    { isLoading, cards, hasMore, searchTerm, error },
    dispatchLoadCardsRequest,
    resetSearch,
  ] = useCardsApiRequest(CARDS_PER_PAGE);

  // Watcher for Search Component changes.
  useEffect(() => {
    // Trigger searchTerm change in store.
    resetSearch(inputSearchTerm);
  }, [inputSearchTerm]);

  // Watcher for changes in searchTerm within store.
  useEffect(() => {
    dispatchLoadCardsRequest();
  }, [searchTerm]);

  return (
    <InfiniteScroll
      dataLength={cards.length}
      next={dispatchLoadCardsRequest}
      hasMore={hasMore}
      height={"100vh"}
      endMessage={
        <p style={{ textAlign: "center" }}>
          {!cards.length && "Looks like there are no more cards!"}
        </p>
      }
    >
      <CardsGrid cards={cards} errorMessage={error} />
      {isLoading && <Spinner />}
    </InfiniteScroll>
  );
}
