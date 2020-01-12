import React, { useEffect } from 'react';
import {
  NavLink,
  // Link
} from 'react-router-dom';
import { connect } from "react-redux";

import {
  apiAction
} from './actions';

const Expedition = (props) => {
  //#region useEffect monitor(s)
  useEffect(() => {
    console.log(`Expedition -> props`, props);
  }, [props]);
  //#endregion useEffect monitor(s)

  //#region JSX
  return (
    <div>
      {props.loggedIn ? (
        <>
          <h4>Log your fishing trips and catches using the form below:</h4>
          <h5>(Pending...)</h5>
        </>
      ) : (
        <h4>
          <NavLink to='/login'>Login</NavLink> to track your fishing trip locations &amp; catches!
        </h4>
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
)(Expedition);