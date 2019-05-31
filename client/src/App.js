import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <h1>App</h1>
        <Route exact path='/' component = {Landing}/>
      </Router>
    );
  }
}

export default App;
