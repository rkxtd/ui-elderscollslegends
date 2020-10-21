import { initialState, reducer, LOAD, ERROR, SEARCH, SUCCESS, load, error, search, success } from "./Cards";
import { describe, it } from "@jest/globals";

const API_ERROR = "API_ERROR";
const SEARCH_TERM = "maga";

describe("Test CardsStore", () => {
  describe("Test Action Creators", () => {
    it("Should return LOAD action type", () => {
      expect(load().type).toBe(LOAD);
    });

    it("Should return ERROR action type", () => {
      expect(error(API_ERROR).type).toBe(ERROR);
      expect(error(API_ERROR).error).toBe(API_ERROR);
    });

    it("Should return SEARCH action type", () => {
      expect(search(SEARCH_TERM).type).toBe(SEARCH);
      expect(search(SEARCH_TERM).value).toBe(SEARCH_TERM);
    });

    it("Should return SUCCESS action type", () => {
      const result = success([1,2], false)
      expect(result.type).toBe(SUCCESS);
      expect(result.cards.length).toBe(2);
      expect(result.hasMore).toBe(false);
    });
  });

  describe("Test reducer", () => {
    it("Should load default state.", () => {
      expect(reducer(initialState, { type: "unknown" })).toBe(initialState);
    });

    it("Should start loading when LOAD action dispatched.", () => {
      expect(initialState.isLoading).toBeFalsy();
      expect(reducer(initialState, { type: LOAD }).isLoading).toBeTruthy();
    });

    it("Should stop loading and record an error when ERROR action dispatched.", () => {
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

      const state = reducer(
        {
          ...initialState,
          pageNum: 4,
          cards: [0, 1, 2, 3],
        },
        { type: SEARCH, value: SEARCH_TERM }
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.pageNum).toBe(1);
      expect(state.cards.length).toBe(0);
      expect(state.searchTerm).toBe(SEARCH_TERM);
    });

    it("Should populate cards, increase page number, stop loader and NOT set hasMore to false when SUCCESS action dispatched.", () => {
      const state = reducer(
        {
          ...initialState,
          pageNum: 3,
          searchTerm: SEARCH_TERM,
          isLoading: true,
          cards: [0, 1],
        },
        { type: SUCCESS, cards: [2, 3], hasMore: true }
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.pageNum).toBe(4);
      expect(state.cards.length).toBe(4);
      expect(state.searchTerm).toBe(SEARCH_TERM);
      expect(state.hasMore).toBeTruthy();
    });

    it("Should populate cards, increase page number, stop loader and set hasMore to false when SUCCESS action dispatched.", () => {
      const searchTerm = "maga";
      const state = reducer(
        {
          ...initialState,
          pageNum: 3,
          searchTerm: SEARCH_TERM,
          isLoading: true,
          cards: [0, 1],
        },
        { type: SUCCESS, cards: [2, 3, 4], hasMore: false }
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.pageNum).toBe(4);
      expect(state.cards.length).toBe(5);
      expect(state.searchTerm).toBe(SEARCH_TERM);
      expect(state.hasMore).toBeFalsy();
    });
  });
});
