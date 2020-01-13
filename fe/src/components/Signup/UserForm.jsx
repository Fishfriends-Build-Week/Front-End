import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
// import {useSelector, useDispatch } from 'react-redux';

import { register, login } from '../actions/index'
import { axiosWithAuth } from '../../utils/axiosWithAuth';

import FormUserDetails from './FormUserDetails';

import { apiSwitcher } from '../../utils/apiSwitcher';
const API = apiSwitcher();

const UserForm = (props) => {
    // const loggedIn = useSelector(state => state.reducer.loggedIn);
    // const dispatch = useDispatch();
    const [users, setUsers] = useState({
        username: '',
        password: '',
    });

    console.log('users from user form', users)

    if (props.loggedIn) return <Redirect to='/profile' />;
    
    const validate = () => {
        let isError = false;
        let errors = {
          passwordError: ''
        };
    
        if(!users.password.length >= 6) {
            isError = true;
            errors.passwordError = 'Password must be at least 6 characters long';
        }
    
        if (isError) {
          setUsers({
            ...users,
            ...errors
          });
        }
    
        return isError;
      };
    
      const onSubmit = e => {
        console.log('users from submit', users)
        e.preventDefault();
        const credentials = {
          username: users.username,
          password: users.password
        }
        axiosWithAuth()
        .post(API+'/accounts/register', users)
        .then(res => {
          // // props.setIsLoggedIn(true);
          // props.history.push('/profile');
          props.login(credentials);
        })
        .catch(err => {
          console.log('The big one that got away', err);
        });

        const err = validate();
    
        if (!err) {
          // dispatch(register(credentials))
          props.register(credentials);
    
          setUsers({
            username: '',
            password: ''
          });
        } 
      };
  

    const handleChanges = input => e => {
      setUsers({ ...users, [input]: e.target.value });
      console.log('Changes to user state', users)
    };

    const { step } = users;
    switch (step) {
      default:
      case 1:
        return(
          <FormUserDetails
            handleChanges={handleChanges}
            values={users}
            onSubmit={onSubmit}
          />
        );
      case 2: 
        return <Redirect to='/profile' />
    }
};

// export default UserForm;

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
    register: (credentials) => dispatch(register(credentials)),
    login: (credentials) => dispatch(login(credentials))
  }
}

export default connect(
  mapStateToProps
  ,mapDispatchToProps
)(UserForm);