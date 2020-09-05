import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import HeaderLinks from "../common/HeaderLinks";

const Header = ({ isAuthenticated }) => {
  const guestLinks = (
    <>
      <HeaderLinks to="/login" label="Login" />
      <HeaderLinks to="/register" label="Register" />
    </>
  );

  const userLinks = <HeaderLinks to="/logout" label="Log Out" />;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info p-0">
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
  isAuthenticated: state.token === null,
});

export default connect(mapStateToProps)(Header);
