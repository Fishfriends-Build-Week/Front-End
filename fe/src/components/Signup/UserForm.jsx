import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
// import {useSelector, useDispatch } from 'react-redux';

import {
  resetErrorState
  ,setErrorState
  ,register
  ,login
} from '../actions';

// import axios from 'axios';
// import { axiosWithAuth } from '../../utils/axiosWithAuth';

import FormUserDetails from './FormUserDetails';

// import { apiSwitcher } from '../../utils/apiSwitcher';
// const API = apiSwitcher();

const UserForm = (props) => {
    //#region data
    const {
      isError
      ,errors
      ,touched
      ,isSubmitting
      ,isLoading
      ,isRegistering
      ,registered
      ,isRegisterError
      ,registerError
      ,isLoggingIn
      ,loggedIn
      ,loginInfo
    } = props;

    // const loggedIn = useSelector(state => state.reducer.loggedIn);
    // const dispatch = useDispatch();
    const [users, setUsers] = useState({
        username: '',
        password: '',
    });
    //#endregion data

    //#region useEffect monitor(s)
    // useEffect(() => {
    //   console.log('users from user form', users)
    // }, [users]);

    useEffect(() => {
      console.log(`UserForm -> values`, users);
    }, [users]);
    useEffect(() => {
      console.log(`UserForm -> isError`, isError);
    }, [isError]);
    useEffect(() => {
      console.log(`UserForm -> errors`, errors);
    }, [errors]);
    useEffect(() => {
      console.log(`UserForm -> touched`, touched);
    }, [touched]);
    useEffect(() => {
      console.log(`UserForm -> isSubmitting`, isSubmitting);
    }, [isSubmitting]);
    useEffect(() => {
      console.log(`UserForm -> isLoading`, isLoading);
    }, [isLoading]);
    useEffect(() => {
      console.log(`UserForm -> isRegistering`, isRegistering);
    }, [isRegistering]);
    useEffect(() => {
      console.log(`UserForm -> isRegisterError`, isRegisterError);
    }, [isRegisterError]);
    useEffect(() => {
      console.log(`UserForm -> registerError`, registerError);
    }, [registerError]);
    useEffect(() => {
      console.log(`UserForm -> isLoggingIn`, isLoggingIn);
    }, [isLoggingIn]);
    useEffect(() => {
      console.log(`UserForm -> loggedIn`, loggedIn);
    }, [loggedIn]);
    useEffect(() => {
      console.log(`UserForm -> loginInfo`, loginInfo);
    }, [loginInfo]);
    //#endregion useEffect monitor(s)

    if (loggedIn) return <Redirect to='/profile' />;
    
    const validate = () => {
      console.log(`UserForm: validate...`);

      props.setErrorState({ isError: false, errors: {} });

      console.log(`UserForm: validate -> users.password.length =`, users.password.length);
      if(users.password.length < 6) {
        props.setErrorState({ isError: true, errors: {
          passwordError: 'Password must be at least 6 characters long'
        }});
      };

      console.log(`UserForm: validate -> isError =`, isError);
    };

    const handleChanges = input => e => {
      // console.log(`Previous user state`, users);
      setUsers({ ...users, [input]: e.target.value });
      // console.log(`Changed in user state: target="${e.target.name}", value="${e.target.value}"`);
      validate();
    };

    const onSubmit = e => {
      e.preventDefault();

      console.log("Submit pressed!");
      console.log('users from submit', users);

      if (users.username !== "" && users.password !== "") {
        // validate();

        if (isError) {
          console.log(`UserForm: onSubmit -> Validation error(s) present!\n`, errors);
        } else {
          const credentials = {
            username: users.username,
            password: users.password
          };
          console.log(`UserForm: onSubmit -> credentials`, credentials);

          // axios
          // .post(API+'/accounts/register', users)
          // .then(res => {
          //   props.login(credentials);
          // })
          // .catch(err => {
          //   console.log('The big one that got away', err);
          // });
          props.register(credentials);

          setUsers({
            username: '',
            password: ''
          });
          props.login(credentials);
        };
      } else {
        console.log(`Username and/or Password blank; Submit ignored.`);
        return false;
      };
    };

    const errorDataHandler = (data) => {
      if (data) {
        console.log(`errorDataHandler -> data\n`, data);
        if (data.error) {
          if (data.error.errno && data.error.code) {
            const e = data.error.errno+"\t"+data.error.code;
            console.log(`errorDataHandler -> e`, e);
            return e;
          } else {
            return data.error;
          }
        } else {
          return data;
        };
      };
    };

    //#region JSX
    if (registered) {
      return (
        <p>Logging in...</p>
      )
    } else {
      const { step } = users;
      switch (step) {
        default:
        case 1:
          return(
            <>
              <FormUserDetails
                values={users}
                setUsers={setUsers}
                handleChanges={handleChanges}
                validate={validate}
                onSubmit={onSubmit}
              />
              <br />
              {isRegisterError && registerError &&
              <div><h4>Register Error!</h4>
                <strong>
                  <span>Status: {registerError.status}</span>&nbsp;
                  <span>{registerError.statusText}</span>
                </strong><br />
                <iframe
                  id="iFrameErrorMessage"
                  title="errorMessage"
                  className="errorMessage"
                  srcDoc={errorDataHandler(registerError.data)}
                />
              </div>}
            </>
          );
        case 2: 
          return <Redirect to='/profile' />
      };
    };
    //#endregion JSX
};

// export default UserForm;

const mapStateToProps = (state) => {
  return {
    isSubmitting: state.isSubmitting,
    isLoading: state.isLoading,
    isError: state.isError,
    errors: state.errors,
    isRegistering: state.isRegistering,
    registered: state.registered,
    isRegisterError: state.isRegisterError,
    registerError: state.registerError,
    isLoggingIn: state.isLoggingIn,
    loggedIn: state.loggedIn,
    loginInfo: state.loginInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetErrorState: () => dispatch(resetErrorState()),
    setErrorState: (errorObject) => dispatch(setErrorState(errorObject)),
    register: (credentials) => dispatch(register(credentials)),
    login: (credentials) => dispatch(login(credentials))
  };
};

export default connect(
  mapStateToProps
  ,mapDispatchToProps
)(UserForm);