import React, { useReducer } from "react";
import { getCards } from "../services/Cards";

export const initialState = {
  searchTerm: "",
  isLoading: false,
  cards: [],
  hasMore: true,
  pageNum: 1,
  error: "",
};

export const SEARCH = "SEARCH";
export const LOAD = "LOAD";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

export function load() {
  return { type: LOAD };
}
export function search(value) {
  return { type: SEARCH, value };
}
export function success(cards, hasMore) {
  return { type: SUCCESS, cards, hasMore };
}
export function error(error) {
  return { type: ERROR, error };
}

export const reducer = (state, { type, value, cards, hasMore, error }) => {
  switch (type) {
    case SEARCH:
      return { ...initialState, searchTerm: value };
    case SUCCESS:
      return {
        ...state,
        cards: [...state.cards, ...cards],
        hasMore,
        isLoading: false,
        pageNum: state.pageNum + 1,
      };
    case ERROR:
      return { ...state, error, isLoading: false };
    case LOAD:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export const useApiRequest = (pageSize) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const makeRequest = async () => {
    const { pageNum, searchTerm } = state;
    dispatch(load());
    try {
      const cards = await getCards({ pageSize, pageNum, searchTerm });
      dispatch(success(cards, cards.length === pageSize));
    } catch (e) {
      dispatch(error(e));
    }
  };

  const setSearch = (searchTerm) => {
    dispatch(search(searchTerm));
  };
  return [state, makeRequest, setSearch];
};

export const Context = React.createContext();
