import React from "react";

import "./Input.css";

const Input = (props) => {
  return (
    <div className="form__element">
      <label className="form__element-label" htmlFor={props.id}>{props.label + ": "}</label>
      <input
        className="form__element-input"
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
