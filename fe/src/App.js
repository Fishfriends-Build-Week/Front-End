import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';

import './App.scss';
import UserForm from './components/Signup/UserForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* <PrivateRoute exact path="/tbd" component={TBD} /> */}
        <Route exact path='/signup' component={UserForm} />
      </div>
    </Router>
  );
}

export default App;
