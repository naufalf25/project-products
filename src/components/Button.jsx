import React from "react";
import PropTypes from "prop-types";

function Button({ type = "", className = "", onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mt-4 cursor-pointer rounded-lg px-4 py-2 font-semibold ${className}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
