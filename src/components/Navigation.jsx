import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { RiMenuFold4Line, RiMenuUnfold4Line } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useLocation } from "react-router";
import PropTypes, { any } from "prop-types";
import { NavConsumer } from "../context/NavContext";
import Button from "./Button";
import NavigationLink from "./NavigationLink";

const navLists = [
  {
    id: "nav-1",
    icon: GoHomeFill,
    title: "dashboard",
    path: "/",
  },
  {
    id: "nav-2",
    icon: FaUser,
    title: "user list",
    path: "/users",
  },
  {
    id: "nav-3",
    icon: FaShoppingCart,
    title: "products list",
    path: "/products",
  },
];

function Navigation({ authUser, onSignOut }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavConsumer>
      {({ nav, toggleNav }) => {
        return (
          <section
            className={`h-screen w-[50px] bg-white px-2 py-2 md:w-auto md:px-4 ${nav ? "fixed top-0 left-0 z-10 w-full md:sticky md:w-xs" : "sticky top-0"}`}
          >
            <div
              className={`flex items-center ${nav ? "justify-end" : "justify-center md:justify-end"}`}
            >
              <Button onClick={toggleNav}>
                {nav ? (
                  <RiMenuUnfold4Line className="text-xl md:text-3xl" />
                ) : (
                  <RiMenuFold4Line className="text-xl md:text-3xl" />
                )}
              </Button>
            </div>
            {nav && (
              <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
                Products <span className="text-orange-600">Apps</span>
              </h1>
            )}
            {!nav && (
              <div className="flex items-center justify-center">
                <h1 className="text-lg font-bold text-orange-600 md:text-xl lg:text-2xl">
                  P
                </h1>
              </div>
            )}
            <div className="flex h-5/6 flex-col justify-between">
              <nav className="mt-10 flex flex-col gap-2">
                {navLists.map(({ id, icon, title, path }) => (
                  <NavigationLink
                    key={id}
                    nav={nav}
                    toggleNav={toggleNav}
                    icon={icon}
                    title={title}
                    currentPath={currentPath}
                    targetPath={path}
                  />
                ))}
              </nav>
              <div className="flex flex-col gap-4">
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
