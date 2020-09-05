import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Input from "../common/Input";

const LoginPage = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  const onChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <>
      <h2>Login</h2>
      <hr />
      <form onSubmit={onSubmit}>
        <Input
          label="Username"
          name="username"
          value={username}
          onChange={onChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button type="submit" className="btn btn-primary rounded">
          Submit
        </button>
      </form>
      <br />
      <p>
        Don't have an account? Register <Link to="register">here</Link>.
      </p>
    </>
  );
};

export default connect(null)(LoginPage);
