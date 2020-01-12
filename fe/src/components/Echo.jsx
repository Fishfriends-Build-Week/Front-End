import React, { useEffect } from 'react';
import {
  NavLink,
  // Link
} from 'react-router-dom';
import { connect } from "react-redux";

import {
  apiAction
} from './actions';

const Echo = (props) => {
  //#region useEffect monitor(s)
  useEffect(() => {
    console.log(`Echo -> props`, props);
  }, [props]);
  //#endregion useEffect monitor(s)

  //#region JSX
  return (
    <div>
      {props.loggedIn ? (
        <>
          <div>Share your expeditions using the form below:</div>
          <div>(Pending...)</div>
        </>
      ) : (
        <>
          <NavLink to='/login'>Login</NavLink> to share your experiences!
        </>
      )}
    </div>
  );
  //#endregion JSX
};

const mapStateToProps = (state) => {
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
  return {
    // login: (credentials) => dispatch(login(credentials))
    apiAction: (action, endpoint, body) => dispatch(apiAction(action, endpoint, body))
  }
}

export default connect(
  mapStateToProps
  ,mapDispatchToProps
)(Echo);