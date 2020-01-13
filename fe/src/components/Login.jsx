import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
// import { Redirect } from 'react-router-dom';
import {
  // useLastLocation,
  RedirectWithoutLastLocation
} from 'react-router-last-location';
import { connect } from "react-redux";
import { withFormik, Form, Field } from "formik";
// import * as Yup from "yup";

import {
  resetErrorState,
  login
} from "./actions";

const LoginForm = props => {
  //#region data
  const {
    values
    ,isError
    ,errors
    ,touched
    ,isSubmitting
    ,isLoading
    ,isLoggingIn
    ,loggedIn
    ,isLoginError
    ,loginError
    ,loginInfo
  } = props;

  // const lastLocation = useLastLocation();
  //#endregion data

  //#region useEffect monitor(s)
  useEffect(() => {
    console.log(`LoginForm -> values`, values);
  }, [values]);
  
  useEffect(() => {
    console.log(`LoginForm -> isError`, isError);
  }, [isError]);
  useEffect(() => {
    console.log(`LoginForm -> errors`, errors);
  }, [errors]);
  useEffect(() => {
    console.log(`LoginForm -> touched`, touched);
  }, [touched]);
  useEffect(() => {
    console.log(`LoginForm -> isSubmitting`, isSubmitting);
  }, [isSubmitting]);
  useEffect(() => {
    console.log(`LoginForm -> isLoading`, isLoading);
  }, [isLoading]);
  useEffect(() => {
    console.log(`LoginForm -> isLoggingIn`, isLoggingIn);
  }, [isLoggingIn]);
  useEffect(() => {
    console.log(`LoginForm -> loggedIn`, loggedIn);
  }, [loggedIn]);
  useEffect(() => {
    console.log(`LoginForm -> isLoginError`, isLoginError);
  }, [isLoginError]);
  useEffect(() => {
    console.log(`LoginForm -> loginError`, loginError);
  }, [loginError]);
  useEffect(() => {
    console.log(`LoginForm -> loginInfo`, loginInfo);
  }, [loginInfo]);
  //#endregion useEffect monitor(s)

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
  if (loggedIn) {
    // if (props.history) {
      return (
        <>
          {/* <div>
            lastLocation: {lastLocation}
          </div> */}
          <RedirectWithoutLastLocation to='/profile' />
        </>
      )
    // } else {
    //   props.history.goBack();
    // }
  } else {
    return (
        <Form>
          <div>
            {touched.username && errors.username && <p>{errors.username}</p>}
            <Field type="username" name="username" placeholder="Username" />
          </div>
          <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type="password" name="password" placeholder="Password" />
          </div>
          <button
            onClick={() => props.resetErrorState()}
            type="reset"
            id="reset"
          >Reset</button>&nbsp;
          <button
            disabled={(isSubmitting || isLoggingIn || isLoading) && !isLoginError}
            type="submit"
            id="submit"
          >Submit</button>
          {isLoginError && loginError &&
          <>
            <br />
            <div><h4>Login Error!</h4>
              <strong>
                <span>Status: {loginError.status}</span>&nbsp;
                <span>{loginError.statusText}</span>
              </strong><br />
              <iframe
                id="iFrameErrorMessage"
                title="errorMessage"
                className="errorMessage"
                srcDoc={errorDataHandler(loginError.data)}
              />
            </div>
          </>}
        </Form>
    );
  };
  //#endregion JSX
};

const FormikLoginForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  //Validation
  // validationSchema: Yup.object().shape({
  //     username: Yup.string()
  //         // .email("username not valid")
  //         .required("username is required"),
  //     password: Yup.string()
  //         .min(2, "Password must be at least 2 characters")
  //         .required("Password is required")
  // }),

  handleSubmit(values, { props }) {
    console.log("Submit pressed!");

    if (values.username !== "" && values.password !== "") {
      console.log(`LoginForm: FormikLoginForm => handleSubmit -> values`, values);
      console.log(`LoginForm: FormikLoginForm => handleSubmit -> props`, props);
      props.login(values);
    } else {
      console.log(`Username and/or Password blank; Submit ignored.`);
      console.log(`LoginForm: FormikLoginForm => handleSubmit -> props`, props);
      return false;
    };
  }
})(LoginForm);

const mapStateToProps = (state) => {
  return {
    isSubmitting: state.isSubmitting,
    isLoading: state.isLoading,
    isError: state.isError,
    errors: state.errors,
    isLoggingIn: state.isLoggingIn,
    loggedIn: state.loggedIn,
    isLoginError: state.isLoginError,
    loginError: state.loginError,
    loginInfo: state.loginInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetErrorState: () => dispatch(resetErrorState()),
    login: (credentials) => dispatch(login(credentials))
  };
};

export default connect(
  mapStateToProps
  ,mapDispatchToProps
)(FormikLoginForm);