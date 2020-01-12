import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
// import { Redirect } from 'react-router-dom';
import {
  useLastLocation
  ,RedirectWithoutLastLocation
} from 'react-router-last-location';
import { connect } from "react-redux";
import { withFormik, Form, Field } from "formik";
// import * as Yup from "yup";

import {
  login
} from "./actions";

function LoginForm({ values, errors, touched, isSubmitting, loggedIn }) {
  //#region data
  const lastLocation = useLastLocation();
  //#endregion data

  //#region useEffect monitor(s)
  useEffect(() => {
    console.log(`LoginForm -> loggedIn`, loggedIn);
    console.log(`Referrer: ${document.referrer}`);
    // eslint-disable-next-line
  }, [])
  //#endregion useEffect monitor(s)

  //#region JSX
  if (loggedIn) {
    // if (props.history) {
      return (
        <>
          <div>
            lastLocation: {lastLocation}
          </div>
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
          <Field  type="username" name="username" placeholder="Username" />
        </div>
        <div>
          {touched.password && errors.password && <p>{errors.password}</p>}
          <Field  type="password" name="password" placeholder="Password" />
        </div>
        <button disabled={isSubmitting} type="submit">Submit</button>
      </Form>
    );
  }
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

  handleSubmit(values, { resetForm, setFieldError, setSubmitting, props }) {
    console.log("submit pressed!");
    console.log(`LoginForm: FormikLoginForm => handleSubmit -> values`, values);
    console.log(`LoginForm: FormikLoginForm => handleSubmit -> props`, props);

    props.login(values, props);
  }
})(LoginForm);

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
    login: (credentials) => dispatch(login(credentials))
  }
}

export default connect(
  mapStateToProps
  ,mapDispatchToProps
)(FormikLoginForm);