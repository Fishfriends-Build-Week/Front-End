import React from "react";
import { connect } from "react-redux";
// import { Redirect } from 'react-router-dom';

import {
  logout
} from "./actions";

const Logout = (props) => {
  console.log(`Logout -> props`, props);

  return (
    <div>
      Logging out...
      <Derp {...props} />
    </div>
  );
};

const Derp = (props) => {
  console.log(`Logout => Derp -> props`, props);

  props.logout();

  // <Redirect to="/" />

  return (null);
};

const mapStateToProps = (state) => {
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
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps
  ,mapDispatchToProps
)(Logout);