import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import HeaderLinks from "../common/HeaderLinks";
import { logout } from "../../redux/actions/auth";

const Header = ({ isAuthenticated, logout }) => {
  const guestLinks = (
    <>
      <HeaderLinks to="/login" label="Login" />
      <HeaderLinks to="/register" label="Register" />
    </>
  );

  const userLinks = (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => {
        logout();
      }}>
      Logout
    </button>
  );

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-info p-0"
      style={{ height: 55 }}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h3 className="mb-0">Home</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {isAuthenticated ? userLinks : guestLinks}
          </ul>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
