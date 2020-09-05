import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const HeaderLinks = ({ to, label }) => {
  return (
    <li className="nav-item">
      <NavLink exact to={to} activeClassName="active" className="nav-link">
        {label}
      </NavLink>
    </li>
  );
};

HeaderLinks.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default HeaderLinks;
