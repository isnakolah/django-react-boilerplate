import React from "react";

const ValidatedInput = props => {
  const {
    name,
    label,
    type,
    placeholder,
    value,
    handleBlur,
    handleChange,
    errors,
    touched,
  } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
        className={errors && touched && "error"}
      />
      {errors && touched && <div className="input-feedback">{errors}</div>}
    </div>
  );
};

export default ValidatedInput;
