import React from "react";
import PropTypes from "prop-types";

function Input({ type, placeholder, className = "", value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-slate-300 p-2 outline-none focus:border-slate-600 md:px-4 ${className}`}
      required
    />
  );
}

Input.PropTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
