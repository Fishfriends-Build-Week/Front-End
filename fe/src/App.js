import React, {
  useReducer,
  useEffect
} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { initialState, reducer } from './components/reducers';
import {
  // register,
  login,
  // getUser,
  // // getUserAccounts,
  // updateUser,
  // setUpdatedUserFlag,
  // deleteUser,
  logout
} from './components/actions';

import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import UserForm from './components/Signup/UserForm';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/UserProfile/Profile';

import './App.scss';

const App = (props) => {
  //#region data
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, initialState);
  //#endregion data

  //#region useEffect monitor(s)
  useEffect(() => {
    console.log(`App -> state`, state);
  }, [state]);

  useEffect(() => {
    console.log(`App -> props`, props);
  }, [props]);
  //#endregion useEffect monitor(s)

  //#region JSX
  return (
    <Router>
      <div className="App">
        <header>
          <Navigation {...state} />
        </header>

        <Route exact path="/" component={Welcome} />

        <Route exact path='/signup' component={UserForm} />
        <Route exact path="/login" component={Login} />

        <PrivateRoute exact path="/profile" component={Profile} />
        <Route exact path="/logout"
          render={(props) => <Logout {...props} />}
        />
      </div>
    </Router>
  );
  //#endregion JSX
};

const mapStateToProps = (state) => {
  console.log(`App: mapStateToProps -> state`, state);
  return {
    isLoading: state.isLoading,
    error: state.error,
    isLoggingIn: state.isLoggingIn,
    loggedIn: state.loggedIn,
    loginError: state.loginError,
    loginInfo: state.loginInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log(`App: mapDispatchToProps -> dispatch`, dispatch);
  return {
    // register: register,
    // // login: login,
    login: (credentials) => dispatch(login(credentials)),
    // getUser: getUser,
    // // getUserAccounts: getUserAccounts,
    // updateUser: updateUser,
    // setUpdatedUserFlag: setUpdatedUserFlag,
    // deleteUser: deleteUser,
    // // logout: logout
    logout: () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps
  ,mapDispatchToProps
)(App);
