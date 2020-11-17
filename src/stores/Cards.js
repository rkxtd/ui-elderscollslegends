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
  creatureType: "",
  isLoading: false,
  cards: [],
  hasMore: true,
  pageNum: 1,
  error: "",
};

// Action Types
export const SEARCH = "SEARCH";
export const LOAD = "LOAD";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

// Actions
/**
 * Dispatched to show that the store is loading a data.
 * @returns {{type: string}}
 */
export function load() {
  return { type: LOAD };
}

/**
 * Dispatched to clear the store from old data and set new search term.
 * @param {string} searchTerm - New Search Term.
 * @returns {{searchTerm: string, creatureType: *, type: string}}
 */
export function search(searchTerm, creatureType) {
  return { type: SEARCH, searchTerm, creatureType };
}

/**
 * Dispatched when data is successfully loaded.
 * @param {array<object>} cards - List of cards received from an API.
 * @param {boolean} hasMore - Indicates whether or not API has more data to load.
 * @returns {{cards: array, hasMore: boolean, type: string}}
 */
export function success(cards, hasMore) {
  return { type: SUCCESS, cards, hasMore };
}

/**
 * Dispatched in case error happens during api request.
 * @param {string} error - Error message.
 * @returns {{type: string, error: string}}
 */
export function error(error) {
  return { type: ERROR, error };
}

export const reducer = (state, { type, searchTerm, creatureType, cards, hasMore, error }) => {
  switch (type) {
    case SEARCH:
      // When Search happens, we should overwrite existing state with initial one.
      return { ...initialState, searchTerm, creatureType };
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
