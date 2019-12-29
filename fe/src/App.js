import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import Login from './components/Login';

import './App.scss';
import UserForm from './components/Signup/UserForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navigation />
        </header>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={Login} />
        <Route exact path='/signup' component={UserForm} />
        {/* <PrivateRoute exact path="/tbd" component={TBD} /> */}
      </div>
    </Router>
  );
}

export default App;
