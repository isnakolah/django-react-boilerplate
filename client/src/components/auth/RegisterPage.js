import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../common/Input";

const RegisterPage = () => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = state;

  const onChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div>
      <h2>Register</h2>
      <hr />
      <form onSubmit={onSubmit}>
        <Input
          label="Username"
          name="username"
          value={username}
          onChange={onChange}
        />
        <Input
          label="Email Address"
          name="email"
          value={email}
          onChange={onChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="password2"
          value={password2}
          onChange={onChange}
        />
        <input
          className="btn btn-primary rounded"
          type="submit"
          value="Register"
        />
      </form>
      <br />
      <p>
        Already have an account? Login <Link to="login">here</Link>.
      </p>
    </div>
  );
};

export default RegisterPage;
