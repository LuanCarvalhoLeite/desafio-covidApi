// import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import Home from './pages/Home';
import Info from './pages/Info';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:pais">
          <Info/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
