import React from "react";

const Logout = (props) => {
  return (
    <div>
      Logging out...
      <Derp {...props} />
    </div>
  );
};

const Derp = (props) => {
  console.log(`TCL: Logout => Derp -> props`, props);

  localStorage.clear();
  props.history.push("/");

  return (null);
}

export default Logout;