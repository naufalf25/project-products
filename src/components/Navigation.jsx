import React, { useContext } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { RiMenuFold4Line, RiMenuUnfold4Line } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { useLocation } from "react-router";
import PropTypes, { any } from "prop-types";
import NavContext from "../context/NavContext";
import Button from "./Button";
import NavigationLink from "./NavigationLink";
import ThemeContext from "../context/UIThemeContext";
import { MdSunny, MdDarkMode } from "react-icons/md";

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
  const { nav, toggleNav } = useContext(NavContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <section
      className={`h-screen w-[50px] bg-white px-2 py-2 md:w-auto lg:px-4 dark:bg-slate-800 ${nav ? "fixed top-0 left-0 z-10 w-full md:sticky md:w-xs" : "sticky top-0"}`}
    >
      <div
        className={`flex items-center ${nav ? "justify-end" : "justify-center lg:justify-end"}`}
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
          <div className="flex items-center justify-center gap-4">
            <img
              src={authUser?.image}
              alt="profile-img"
              className="h-8 w-8 rounded-full bg-white p-1 lg:h-10 lg:w-10"
            />
            {nav && (
              <p className="font-medium">
                {authUser?.firstName} {authUser?.lastName}
              </p>
            )}
          </div>
          <button
            className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-600 bg-red-600 p-2 text-white hover:bg-transparent hover:text-red-600"
            onClick={onSignOut}
          >
            {nav && <p>Log out</p>}
            <MdOutlineLogout className="text-xl md:text-2xl" />
          </button>
          <button
            onClick={toggleTheme}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-950 p-2 dark:border-yellow-500"
          >
            {theme === "dark" ? (
              <MdSunny className="text-xl text-yellow-500 md:text-2xl" />
            ) : (
              <MdDarkMode className="text-xl text-blue-950 md:text-2xl" />
            )}
            {nav && (
              <p className="dark:text-yellow-500">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </p>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.objectOf(any),
  onSignOut: PropTypes.func.isRequired,
};

export default Navigation;
