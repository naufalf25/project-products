import React, { useState } from "react";
import Button from "./Button";
import { GoHomeFill } from "react-icons/go";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { RiMenuFold4Line, RiMenuUnfold4Line } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useLocation } from "react-router";
import PropTypes, { any } from "prop-types";

function Navigation({ authUser, onSignOut }) {
  console.log(authUser);
  const [menu, setMenu] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <section
      className={`fixed top-0 left-0 h-full bg-white px-6 py-2 md:relative ${menu && "w-full md:w-[300px]"}`}
    >
      <div className="flex items-center justify-end">
        <Button onClick={() => setMenu(!menu)}>
          {menu ? (
            <RiMenuUnfold4Line className="text-2xl md:text-3xl" />
          ) : (
            <RiMenuFold4Line className="text-2xl md:text-3xl" />
          )}
        </Button>
      </div>
      {menu && (
        <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
          Products <span className="text-orange-600">Apps</span>
        </h1>
      )}
      <div className="flex h-5/6 flex-col justify-between">
        <nav className="mt-10 flex flex-col gap-2">
          <Link
            to="/"
            onClick={() => setMenu(false)}
            className={`flex items-center gap-4 rounded-lg px-4 py-2 hover:bg-orange-100 ${currentPath === "/" && "bg-orange-100"}`}
          >
            <GoHomeFill className="text-2xl" />
            {menu && <p className="md:text-lg">Dashboards</p>}
          </Link>
          <Link
            to="/users"
            onClick={() => setMenu(false)}
            className={`flex items-center gap-4 rounded-lg px-4 py-2 hover:bg-orange-100 ${currentPath.startsWith("/users") && "bg-orange-100"}`}
          >
            <FaUser className="text-2xl" />
            {menu && <p className="md:text-lg">User List</p>}
          </Link>
          <Link
            to="/products"
            onClick={() => setMenu(false)}
            className={`flex items-center gap-4 rounded-lg px-4 py-2 hover:bg-orange-100 ${currentPath.startsWith("/products") && "bg-orange-100"}`}
          >
            <FaShoppingCart className="text-2xl" />
            {menu && <p className="md:text-lg">Product List</p>}
          </Link>
        </nav>
        <div>
          <div className="flex items-center justify-center gap-2">
            <img
              src={authUser?.image}
              alt="profile-img"
              className="h-10 w-10 rounded-full"
            />
            {menu && (
              <p className="font-medium">
                {authUser?.firstName} {authUser?.lastName}
              </p>
            )}
          </div>
          <Button
            className="flex w-full items-center justify-center gap-2 border border-red-600 bg-red-600 text-white hover:bg-transparent hover:text-red-600"
            onClick={onSignOut}
          >
            {menu && <p>Log out</p>}
            <MdOutlineLogout className="text-xl md:text-2xl" />
          </Button>
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
