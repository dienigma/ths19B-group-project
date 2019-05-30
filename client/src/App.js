import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import Lesson from "./components/Lessons/Lesson";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/lesson" component={Lesson} />
      </Router>
    );
  }
}

export default App;
