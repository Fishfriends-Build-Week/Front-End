import React from "react";
// import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
// import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, isSubmitting}) {
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
            <button disabled={isSubmitting}>Submit</button>
        </Form>

    );
};

const FormikLoginForm = withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || "",
            password: password || "",
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

    handleSubmit(values, { resetForm, setFieldError, setSubmitting }) {
        console.log(values);
        if (values.username === "ENTERTAKENusernameHERE") {    // Form submission code here, HTTP request
            setFieldError("username", "Seaman! Pick another username");
        } else {
            axios
                .post("https://fish-friends-build-week.herokuapp.com/accounts/login", values)
                .then(res => {
                    console.log(res); // Data was created successfully
                    localStorage.setItem("token", res.data.token);
                    // Extract Username from message and force the first leter to Upper Case
                    let u = res.data.message.split(' ').slice(1).join(' ');
                    u = u.slice(0,1).toUpperCase() + u.slice(1);
                    localStorage.setItem("username", u);

                    resetForm();
                    setSubmitting(false);
                })
                .catch(err => {
                    console.log(err);
                    setSubmitting(false);
                });
        }
    }     
}) (LoginForm);

export default FormikLoginForm;