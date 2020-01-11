import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from "react-redux";

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
          <div>Log your fishing trips and catches using the form below:</div>
          <div>(Pending...)</div>
        </>
      ) : (
        <>
          <NavLink to='/login'>Login</NavLink> to track your fishing trip locations &amp; catches!
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
  }
}

export default connect(
  mapStateToProps
  ,mapDispatchToProps
)(Expedition);