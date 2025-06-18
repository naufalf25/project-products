import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router";

function NavigationLink({
  nav,
  toggleNav,
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  currentPath,
  targetPath,
  title,
}) {
  const location = useLocation();
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <Link
      to={targetPath}
      onClick={isMobile && nav && toggleNav}
      className={`flex items-center gap-4 rounded-lg p-2 hover:bg-orange-100 lg:px-4 hover:dark:text-black ${title === "dashboard" ? currentPath === "/" && "bg-orange-100 dark:text-black" : location.pathname.startsWith(targetPath) && "bg-orange-100 dark:text-black"}`}
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
