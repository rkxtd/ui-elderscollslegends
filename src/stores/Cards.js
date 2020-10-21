import React from "react";

/**
 * @typedef {Object} CardsState
 * @property {string} searchTerm - Indicates whether the Search Component send any value.
 * @property {boolean} isLoading - Indicates whether the store in the process of loading data.
 * @property {array} cards - List of Cards, received from API.
 * @property {boolean} hasMore - Indicates whether the API has more cards to load.
 * @property {boolean} pageNum - Indicates number of pages were loaded.
 * @property {string} error - Indicates whether any error did happen.
 */
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

export const Context = React.createContext();
