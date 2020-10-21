import { initialState, reducer, LOAD, ERROR, SEARCH, SUCCESS } from "./Cards";
import { describe, it } from "@jest/globals";

describe("Test CardsStore", () => {
  describe("Test reducer", () => {
    it("Should start loading when LOAD action dispatched.", () => {
      expect(initialState.isLoading).toBeFalsy();
      expect(reducer(initialState, { type: LOAD }).isLoading).toBeTruthy();
    });
    it("Should stop loading and record an error when ERROR action dispatched.", () => {
      const API_ERROR = "API_ERROR";
      const state = reducer(
        {
          ...initialState,
          isLoading: true,
        },
        { type: ERROR, error: API_ERROR }
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBe(API_ERROR);
    });
    it("Should reset whole state and initialize new search term, when SEARCH action dispatched.", () => {
      const searchTerm = "maga";
      const state = reducer(
        {
          ...initialState,
          pageNum: 4,
          cards: [0, 1, 2, 3],
        },
        { type: SEARCH, value: searchTerm }
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.pageNum).toBe(1);
      expect(state.cards.length).toBe(0);
      expect(state.searchTerm).toBe(searchTerm);
    });
    it("Should populate cards, increase page number, stop loader and NOT set hasMore to false when SUCCESS action dispatched.", () => {
      const searchTerm = "maga";
      const state = reducer(
        {
          ...initialState,
          pageNum: 3,
          searchTerm,
          isLoading: true,
          cards: [0, 1],
        },
        { type: SUCCESS, cards: [2, 3], hasMore: true }
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.pageNum).toBe(4);
      expect(state.cards.length).toBe(4);
      expect(state.searchTerm).toBe(searchTerm);
      expect(state.hasMore).toBeTruthy();
    });
    it("Should populate cards, increase page number, stop loader and set hasMore to false when SUCCESS action dispatched.", () => {
      const searchTerm = "maga";
      const state = reducer(
        {
          ...initialState,
          pageNum: 3,
          searchTerm,
          isLoading: true,
          cards: [0, 1],
        },
        { type: SUCCESS, cards: [2, 3, 4], hasMore: false }
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.pageNum).toBe(4);
      expect(state.cards.length).toBe(5);
      expect(state.searchTerm).toBe(searchTerm);
      expect(state.hasMore).toBeFalsy();
    });
  });
});
