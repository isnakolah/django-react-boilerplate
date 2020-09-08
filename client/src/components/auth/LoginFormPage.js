import { Formik, Form } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { InputField } from "../common/Fields";
import { authLogin } from "../../redux/actions/auth";

const SignupForm = ({ authLogin }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const { username, password } = values;
        setTimeout(() => {
          authLogin(username, password);
          setSubmitting(true);
        }, 400);
      }}>
      <Form>
        <InputField
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your name"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
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

export default connect(null, { authLogin })(SignupForm);
