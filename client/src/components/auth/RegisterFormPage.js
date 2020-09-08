import { Formik, Form } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { InputField } from "../common/Fields";
import { authRegister } from "../../redux/actions/auth";

const SignupForm = ({ authRegister }) => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "", password2: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        email: Yup.string().email("Enter a valid email").required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
        password2: Yup.string()
          .required("No password provided.")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const { username, email, password } = values;
        setTimeout(() => {
          authRegister(username, email, password);
          setSubmitting(true);
        }, 400);
      }}>
      <Form className="form-group m-auto" style={{ width: 400 }}>
        <h1>Register</h1> <hr />
        <br />
        <InputField
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your name"
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <InputField
          label="Confirm Password"
          name="password2"
          type="password"
          placeholder="Confirm your password"
        />
        <br />
        <button type="submit" className="btn btn-outline-success has-error">
          Submit
        </button>
        <p className="pt-3">
          Don't have an account? Register <Link to="register">here</Link>.
        </p>
      </Form>
    </Formik>
  );
};

export default connect(null, { authRegister })(SignupForm);
