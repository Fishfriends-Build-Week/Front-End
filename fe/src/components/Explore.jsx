import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from "react-redux";

const Explore = (props) => {
  //#region useEffect monitor(s)
  useEffect(() => {
    console.log(`Explore -> props`, props);
  }, [props]);
  //#endregion useEffect monitor(s)

  //#region JSX
  return (
    <>
      <div>Find and view fishing locations and great catches by other users</div>
      <div>
        
      </div>
    </>
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
)(Explore);
