import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  console.log(`PrivateRoute -> props`, props);

  const { component: Component, ...additionalProps } = props;

  return (
    <Route
      {...additionalProps}
      render={innerProps => {
        if (localStorage.getItem('token')) {
          return <Component {...innerProps} />;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
};

export default PrivateRoute;