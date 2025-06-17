import React from "react";
import Button from "./Button";
import { GoHomeFill } from "react-icons/go";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { RiMenuFold4Line, RiMenuUnfold4Line } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useLocation } from "react-router";
import PropTypes, { any } from "prop-types";
import { NavConsumer } from "../context/NavContext";

function Navigation({ authUser, onSignOut }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavConsumer>
      {({ nav, toggleNav }) => {
        return (
          <section
            className={`h-full w-[50px] bg-white px-2 py-2 md:w-auto md:px-4 ${nav && "fixed top-0 left-0 w-full md:relative md:w-xs"}`}
          >
            <div
              className={`flex items-center ${nav ? "justify-end" : "justify-center md:justify-end"}`}
            >
              <button
                className="mt-4 cursor-pointer px-4 py-2"
                onClick={toggleNav}
              >
                {nav ? (
                  <RiMenuUnfold4Line className="text-xl md:text-3xl" />
                ) : (
                  <RiMenuFold4Line className="text-xl md:text-3xl" />
                )}
              </button>
            </div>
            {nav && (
              <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
                Products <span className="text-orange-600">Apps</span>
              </h1>
            )}
            <div className="flex h-5/6 flex-col justify-between">
              <nav className="mt-10 flex flex-col gap-2">
                <Link
                  to="/"
                  onClick={toggleNav}
                  className={`flex items-center gap-4 rounded-lg p-2 hover:bg-orange-100 md:px-4 ${currentPath === "/" && "bg-orange-100"}`}
                >
                  <GoHomeFill className="text-lg md:text-2xl" />
                  {nav && <p className="md:text-lg">Dashboards</p>}
                </Link>
                <Link
                  to="/users"
                  onClick={toggleNav}
                  className={`flex items-center gap-4 rounded-lg p-2 hover:bg-orange-100 md:px-4 ${currentPath.startsWith("/users") && "bg-orange-100"}`}
                >
                  <FaUser className="text-lg md:text-2xl" />
                  {nav && <p className="md:text-lg">User List</p>}
                </Link>
                <Link
                  to="/products"
                  onClick={toggleNav}
                  className={`flex items-center gap-4 rounded-lg p-2 hover:bg-orange-100 md:px-4 ${currentPath.startsWith("/products") && "bg-orange-100"}`}
                >
                  <FaShoppingCart className="text-lg md:text-2xl" />
                  {nav && <p className="md:text-lg">Product List</p>}
                </Link>
              </nav>
              <div>
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={authUser?.image}
                    alt="profile-img"
                    className="h-8 w-8 rounded-full md:h-10 md:w-10"
                  />
                  {nav && (
                    <p className="font-medium">
                      {authUser?.firstName} {authUser?.lastName}
                    </p>
                  )}
                </div>
                <button
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-red-600 bg-red-600 p-2 text-white hover:bg-transparent hover:text-red-600"
                  onClick={onSignOut}
                >
                  {nav && <p>Log out</p>}
                  <MdOutlineLogout className="text-xl md:text-2xl" />
                </button>
              </div>
            </div>
          </section>
        );
      }}
    </NavConsumer>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.objectOf(any),
  onSignOut: PropTypes.func.isRequired,
};

export default Navigation;
