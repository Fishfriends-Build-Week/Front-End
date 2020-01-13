import React, {
  useReducer,
  useEffect
} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import { connect } from 'react-redux';
import { initialState, reducer } from './components/reducers';
import {
  resetErrorState,
  setErrorState,
  // register,
  login,
  // getUsers,
  // getUser,
  getUserById,
  // // getUserAccounts,
  // updateUser,
  // setUpdatedUserFlag,
  // deleteUser,
  // apiAction,
  logout
} from './components/actions';

import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import UserForm from './components/Signup/UserForm';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/UserProfile/Profile';
import Expedition from './components/Expedition';
import Explore from './components/Explore';
import Echo from './components/Echo';

import './App.scss';

const App = (props) => {
  //#region data
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, initialState);
  //#endregion data

  //#region useEffect monitor(s)
  useEffect(() => {
    console.log(`App -> state`, state);

    if (!state.loggedIn) {
      const u = state.loginInfo.username;
      const p = state.loginInfo.password;
      if (u !== '' && p !== '') {
        console.log(`App -> state: Attempting to re-login as '${u}'...`);
        const c = {u, p};
        props.login(c);
      };
    };
    // eslint-disable-next-line
  }, [state]);

  useEffect(() => {
    console.log(`App -> props`, props);

    if (!props.loggedIn) {
      const t = localStorage.getItem("token")
      const i = localStorage.getItem("account_id")
      if (t && i) {
        if (props.loginInfo.account_id === -1) {
          console.log(`App -> props: getUserById(${i})...`);
          props.getUserById(i);
        };
      };
    };
  }, [props]);
  //#endregion useEffect monitor(s)

  //#region JSX
  return (
    <Router>
      <LastLocationProvider>
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
  
          <Route exact path="/expedition" component={Expedition} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/echo" component={Echo} />
        </div>
      </LastLocationProvider>
    </Router>
  );
  //#endregion JSX
};

const mapStateToProps = (state) => {
  console.log(`App: mapStateToProps -> state`, state);
  return {
    isLoading: state.isLoading,
    isError: state.isError,
    errors: state.errors,
    isLoggingIn: state.isLoggingIn,
    loggedIn: state.loggedIn,
    loginError: state.loginError,
    loginInfo: state.loginInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log(`App: mapDispatchToProps -> dispatch`, dispatch);
  return {
    resetErrorState: () => dispatch(resetErrorState()),
    setErrorState: (errorObject) => dispatch(setErrorState(errorObject)),
    // register: register,
    // // login: login,
    login: (credentials) => dispatch(login(credentials)),
    // getUsers: () => dispatch(getUsers()),
    // getUser: (username) => dispatch(getUser(username)),
    getUserById: (id) => dispatch(getUserById(id)),
    // // getUserAccounts: getUserAccounts,
    // updateUser: updateUser,
    // setUpdatedUserFlag: setUpdatedUserFlag,
    // deleteUser: deleteUser,
    // // logout: logout
    // apiAction: (action, endpoint, body) => dispatch(apiAction(action, endpoint, body)),
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps
  ,mapDispatchToProps
)(App);
