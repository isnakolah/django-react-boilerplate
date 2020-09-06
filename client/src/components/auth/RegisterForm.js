import React from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import { Link } from "react-router-dom";

import "./LoginForm.css";

const LoginForm = () => (
  <Formik
    initialValues={{ username: "", email: "", password: "", password2: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        setSubmitting(false);
      }, 500);
    }}
    validationSchema={object().shape({
      username: string().required("Required"),
      email: string().email().required("Required"),
      password: string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
      password2: string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    })}>
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username && "error"}
          />
          {errors.username && touched.username && (
            <div className="input-feedback">{errors.username}</div>
          )}

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}

          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
          />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}

          <label htmlFor="email">Confirm Password</label>
          <input
            name="password2"
            type="password"
            placeholder="Confirm your password"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password2 && touched.password2 && "error"}
          />
          {errors.password2 && touched.password2 && (
            <div className="input-feedback">{errors.password2}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-outline-success">
            Register
          </button>

          <p className="pt-3">
            Already have an account? Login <Link to="login">here</Link>.
          </p>
        </form>
      );
    }}
  </Formik>
);

export default LoginForm;
