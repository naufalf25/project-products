import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

function NavigationLink({
  nav,
  toggleNav,
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  currentPath,
  targetPath,
  title,
}) {
  return (
    <Link
      to={targetPath}
      onClick={nav && toggleNav}
      className={`flex items-center gap-4 rounded-lg p-2 hover:bg-orange-100 md:px-4 ${currentPath === targetPath && "bg-orange-100"}`}
    >
      <Icon className="text-lg md:text-2xl" />
      {nav && <p className="capitalize md:text-lg">{title}</p>}
    </Link>
  );
}

NavigationLink.propTypes = {
  nav: PropTypes.bool.isRequired,
  icon: PropTypes.node.isRequired,
  toggleNav: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
  targetPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default NavigationLink;
