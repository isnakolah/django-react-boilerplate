import React from "react";
import PropTypes from "prop-types";

const Input = props => {
  const {
    label,
    onChange,
    name,
    value,
    type,
    className,
    placeholder,
    handleBlur,
  } = props;
  const classes = "form-control " + className;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type ? type : "text"}
        name={name}
        className={className ? className : "form-control"}
        onChange={onChange}
        value={value}
        placeholder={placeholder ? placeholder : label}
        aria-placeholder={placeholder ? placeholder : label}
        aria-label={placeholder ? placeholder : label}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
