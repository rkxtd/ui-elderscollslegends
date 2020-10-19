import React, { useEffect, useState, useContext, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import CardsGrid from "../../components/CardsGrid";
import Spinner from "../../components/Spinner";
import { getCards } from "../../services/Cards";
import { Context as SearchContext } from "../../stores/Search";

async function loadMoreData(setStore, pageNum, searchTerm, flush = false) {
  if (flush) {
    pageNum = 1;
    setStore((oldStore) => ({ ...oldStore, hasMore: true, cards: [] }));
  }
  const cards = await getCards({ pageNum, searchTerm });
  if (flush) {
    setStore((oldStore) => ({ ...oldStore, cards, page: pageNum + 1 }));
  } else {
    setStore((oldStore) => ({
      ...oldStore,
      cards: [...oldStore.cards, ...cards],
      page: pageNum + 1,
    }));
  }

  if (!cards.length) {
    setStore((oldStore) => ({ ...oldStore, hasMore: false }));
  }
}

export default function HomePage() {
  const [cardsStore, setStore] = useState({
    cards: [],
    page: 1,
    hasMore: true,
  });
  const { store: SearchStore } = useContext(SearchContext);
  const scroll = useRef(null);

  useEffect(() => {
    scroll.current.el.scrollTo(0, 0);
    loadMoreData(setStore, cardsStore.page, SearchStore.searchTerm, true);
  }, [SearchStore]);

  const fetchMoreData = async () => {
    return await loadMoreData(
      setStore,
      cardsStore.page,
      SearchStore.searchTerm
    );
  };
  return (
    <InfiniteScroll
      dataLength={cardsStore.cards.length}
      next={fetchMoreData}
      hasMore={cardsStore.hasMore}
      loader={<Spinner />}
      height={"100vh"}
      ref={scroll}
    >
      <CardsGrid cards={cardsStore.cards} />
    </InfiniteScroll>
  );
}
