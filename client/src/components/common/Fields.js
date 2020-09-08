import React from "react";
import { useField } from "formik";
import styled from "styled-components";

const getStyles = (errors, fieldName) => {
  if (errors) {
    return {
      border: "1px solid red",
    };
  } else {
    return {
      border: "1px solid black",
    };
  }
};

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        // style={getStyles(meta.error, meta.name)}
        // className={meta.touched && meta.error && "error" ? "has-error" : null}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="input-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
};
