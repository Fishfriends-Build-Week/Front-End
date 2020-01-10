import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from "react-redux";

const Navigation = (props) => {
  //#region useEffect monitor(s)
  useEffect(() => {
    console.log(`Navigation -> props`, props);
  }, [props]);
  //#endregion useEffect monitor(s)

  //#region JSX
  return (
    <nav>
      <Link to='/'>Home</Link>
      <NavLink to='/expedition'>Expedition</NavLink>
      <NavLink to='/echo'>Echo</NavLink>
      <NavLink to='/explore'>Explore</NavLink>
      {props.loggedIn ? (
        <>
          <NavLink to='/profile'>{props.loginInfo.username}'s Profile</NavLink>
          <NavLink to='/logout'>Logout</NavLink>
        </>
      ) : (
        <>
          <NavLink to='/signup'>Sign Up</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </>
      )}
    </nav>
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

export default connect(
  mapStateToProps,
  {}
)(Navigation);