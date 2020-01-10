import React, {
  useReducer,
  useEffect
} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

import { connect } from 'react-redux';
import { initialState, reducer } from './components/reducers';
import {
  APP_UPDATE,
  // REGISTER_START,
  // REGISTER_SUCCESS,
  // REGISTER_FAIL,
  // LOGIN_START,
  // LOGIN_SUCCESS,
  // LOGIN_FAIL,
  // FETCH_USER_START,
  // FETCH_USER_SUCCESS,
  // FETCH_USER_FAIL,
  // LOGOUT,
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
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [cookies, setCookie] = useCookies(['fishfriends']);
  //#endregion data

  //#region dispatch functions
  const appUpdate = (data) => {
    console.log(`App: appUpdate -> data`, data);
    dispatch({type: APP_UPDATE, payload: data});
  }
  //#endregion dispatch functions

  //#region useEffect monitor(s)
  useEffect(() => {
    console.log('App state:', state);
  }, [state]);

  useEffect(() => {
    console.log('App props:', props);
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
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/login"
          render={state => {
            return <Login {...state} />;
          }}
        />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/logout" component={Logout} />
      </div>
    </Router>
  );
  //#endregion JSX
};

const mapStateToProps = (state) => {
  console.log('App mapStateToProps state: ', state);
  return {
    isLoading: state.isLoading,
    error: state.error,
    isLoggingIn: state.isLoggingIn,
    loggedIn: state.loggedIn,
    loginError: state.loginError,
    userData: state.userData
  };
};

export default connect(
  mapStateToProps,
  {}
)(App);

