import React, { useEffect } from "react";
import Header from "./layout/Header";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { authCheckState } from "../redux/actions/auth";
import PageNotFound from "./pagenotfound/PageNotFound";
import Home from "./home/Home";
import PrivateRoute from "./common/PrivateRoute";
import RegisterFormPage from "./auth/RegisterFormPage";
import LoginFormPage from "./auth/LoginFormPage";

const App = ({ onTryAutoSignIn }) => {
  useEffect(() => {
    onTryAutoSignIn();
  });

  return (
    <Router>
      <Header />
      <div className="container pt-4">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={LoginFormPage} />
          <Route path="/register" component={RegisterFormPage} />
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
