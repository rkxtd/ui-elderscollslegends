import React, { useEffect, useRef, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import CardsGrid from "../../components/CardsGrid";
import Spinner from "../../components/Spinner";
import { Context as CardsContext, useApiRequest } from "../../stores/Cards";

const CARDS_PER_PAGE = 20;

export default function Home() {
  const { store: {searchTerm: inputSearchTerm} } = useContext(CardsContext);
  const [{ isLoading, cards, hasMore, searchTerm },
    dispatchLoadCardsRequest, resetSearch ] = useApiRequest(CARDS_PER_PAGE);
  const infiniteScroll = useRef(null);

  // Watcher for Search Component changes.
  useEffect(() => {
    infiniteScroll.current.el.scrollTo(0, 0);
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
      ref={infiniteScroll}
      endMessage={
        <p style={{ textAlign: "center" }}>
          {!cards.length && "Looks like there are no more cards!"}
        </p>
      }
    >
      <CardsGrid cards={cards} />
      {isLoading && <Spinner />}
    </InfiniteScroll>
  );
}
