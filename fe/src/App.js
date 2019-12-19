import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
// import Login from './components/Login';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/tbd" component={TBD} /> */}
      </div>
    </Router>
  );
}

export default App;
