import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navigation = (props) => {
  //#region data
  const [token, setToken] = useState();
  const [username, setUsername] = useState("");
  //#endregion data

  //#region useEffect monitor(s)
  useEffect(() => {
    console.log(`Navigation -> props`, props);
  }, [props]);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(localStorage.getItem("username"));
    // eslint-disable-next-line
  }, [localStorage.getItem("token")]);
  //#endregion useEffect monitor(s)

  //#region JSX
  return (
    <nav>
      <Link to='/'>Home</Link>
      <NavLink to='/expedition'>Expedition</NavLink>
      <NavLink to='/echo'>Echo</NavLink>
      <NavLink to='/explore'>Explore</NavLink>
      {props.loggedIn || token ? (  //TODO: token is temporary here until props.loggedIn is working
        <>
          <NavLink to='/profile'>{username}'s Profile</NavLink>
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

export default Navigation;