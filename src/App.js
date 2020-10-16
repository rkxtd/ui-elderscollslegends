import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { render } from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Header from "./components/Header";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <React.Fragment>
          <CssBaseline />
            <Typography component="div" className="content">
              <Route exact path="/" component={HomePage} />
            </Typography>
        </React.Fragment>
      </Router>
    </div>
  );
}

render(<App />, document.querySelector('#app'));
