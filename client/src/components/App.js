import React, { useEffect } from "react";
import Header from "./layout/Header";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { authCheckState } from "../redux/actions/auth";
import PageNotFound from "./pagenotfound/PageNotFound";
import Home from "./home/Home";
import PrivateRoute from "./common/PrivateRoute";
import RegisterPage from "./auth/RegisterPage";
import RegisterForm from "./auth/RegisterForm";
import LoginForm from "./auth/LoginForm";

const App = ({ onTryAutoSignIn }) => {
  useEffect(() => {
    onTryAutoSignIn();
  }, []);

  return (
    <Router>
      <Header />
      <div className="container pt-4">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

const mapDispatchToProps = dispatch => ({
  onTryAutoSignIn: () => dispatch(authCheckState),
});

export default connect(null, mapDispatchToProps)(App);
