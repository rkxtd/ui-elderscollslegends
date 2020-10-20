import React, { useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Context, initialState, reducer } from "./stores/Cards";

export default function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ store, dispatch }}>
      <div className="App">
        <Router>
          <Header />
          <React.Fragment>
            <CssBaseline />
            <Typography component="div" className="content">
              <Route exact path="/" component={Home} />
            </Typography>
          </React.Fragment>
        </Router>
      </div>
    </Context.Provider>
  );
}
