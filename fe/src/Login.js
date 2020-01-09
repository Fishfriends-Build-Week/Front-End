import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, isSubmitting}) {
    return (
        <Form>
            <div>
             {touched.email && errors.email && <p>{errors.email}</p>}
             <Field  type="email" name="email" placeholder="Email" />
            </div>
            <div>
             {touched.password && errors.password && <p>{errors.password}</p>}
             <Field  type="password" name="password" placeholder="Password" />
            </div>
            <button disabled={isSubmitting}>Login</button>
        </Form>

    );
};

const FormikLoginForm = withFormik({
    mapPropsToValues({ email, password }) {
        return {
            email: email || "",
            password: password || ""
        };
    },
    //Validation
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required")
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        console.log(values);
        if (values.email === "ENTERTAKENEMAILHERE") {    // Form submission code here, HTTP request
            setErrors({ email: "Seaman! Pick another email" });
        } else {
            axios
                .post("https://fish-friends-build-week.herokuapp.com/accounts/login", values)
                .then(res => {
                    console.log(res); // Data was created successfully
                    resetForm();
                    setSubmitting(false);
                    props.history.push('/')
                })
                .catch(err => {
                    console.log(err);  // There was an error
                    setSubmitting(false);
                });
        }
       
    }     
}) (LoginForm);

export default FormikLoginForm;