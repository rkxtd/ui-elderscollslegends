import { useReducer } from "react";
import { getCards } from "../services/Cards";
import {
  error,
  initialState,
  load,
  reducer,
  search,
  success,
} from "../stores/Cards";

/**
 * Custom Hook for working with Cards Api.
 * @hook
 * @param {number} pageSize - Number of cards api should return with each response.
 * Should be between 1 and 100.
 * @returns {[CardsState, Promise<makeRequest>,setSearch]}
 */
export const useCardsApiRequest = (pageSize) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  /**
   * Function for retrieving next available cards from API.
   * Does not return anything, only dispatches an events for CardsStore reducer.
   * @function makeRequest
   * @async
   */
  const makeRequest = async () => {
    const { pageNum, searchTerm, isLoading } = state;
    // Skip additional load if we didn't finished previous part.
    if (isLoading) {
      return;
    }

    dispatch(load());
    try {
      const cards = await getCards({ pageSize, pageNum, searchTerm });
      dispatch(success(cards, cards.length === pageSize));
    } catch (e) {
      dispatch(error(e.message));
    }
  };

  /**
   * Function for erasing CardsStore and setting new search term.
   * After this method is invoked, all following makeRequest calls will be done,
   * with defined searchTerm by this function.
   * @function setSearch
   * @param {string} searchTerm - Indicates new search term for API.
   */
  const setSearch = (searchTerm) => {
    dispatch(search(searchTerm));
  };

  return [state, makeRequest, setSearch];
};
