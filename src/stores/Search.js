import React from "react";

export const initialState = { searchTerm: "" };

export const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "search":
      return { searchTerm: action.value };
    default:
      return state;
  }
};

export const Context = React.createContext();
