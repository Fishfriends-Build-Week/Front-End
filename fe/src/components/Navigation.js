import React from "react";
import { NavLink, Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/signup'>Sign Up</NavLink>
      <NavLink to='/expedition'>Expedition</NavLink>
      <NavLink to='/echo'>Echo</NavLink>
      <NavLink to='/explore'>Explore</NavLink>
    </nav>
  );
};

export default Navigation;