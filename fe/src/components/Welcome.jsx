import React from "react";
import { NavLink } from 'react-router-dom';

const Welcome = () => {
  return (
    <>
      <h1>Welcome to Fish Friends</h1>
      <h2>The best darn fishing app you'll ever use</h2>
      <br />
      <h2>Features:</h2>
      <h3><NavLink to='/explore'>Explore</NavLink> locations &amp; catches shared by the community</h3>
      <h3><NavLink to='/expedition'>Expedition</NavLink> log your fishing trip locations &amp; catches</h3>
      <h3><NavLink to='/echo'>Echo</NavLink> share your expeditions with the community</h3>
    </>
  );
};

export default Welcome;