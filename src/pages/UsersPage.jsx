import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetUser,
  asyncGetUserFilter,
  asyncGetUserSearch,
  asyncSetLimit,
  asyncSetPage,
} from "../states/users/action";
import UsersTable from "../components/UsersTable";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";

const roleList = [
  {
    id: "role-1",
    name: "all",
  },
  {
    id: "role-2",
    name: "admin",
  },
  {
    id: "role-3",
    name: "moderator",
  },
  {
    id: "role-4",
    name: "user",
  },
];

function UsersPage() {
  const [role, setRole] = useState("all");
  const [search, setSearch] = useState("");
  const {
    users = [],
    total,
    page,
    limit,
  } = useSelector((states) => states.users);
  const { loading = false } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (role !== "all" && search === "") {
        dispatch(
          asyncGetUserFilter({
            key: "role",
            value: role,
            skip: page - 1,
            limit,
          })
        );
      } else if (search !== "") {
        setRole("all");
        dispatch(asyncGetUserSearch({ query: search, skip: page - 1, limit }));
      } else {
        dispatch(asyncGetUser({ skip: page - 1, limit }));
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [dispatch, limit, page, role, search]);

  const handleChangeSearch = (e) => {
    dispatch(asyncSetPage(1));
    setSearch(e.target.value);
  };

  const handleRoleButton = (e) => {
    e.preventDefault();

    setSearch("");
    dispatch(asyncSetPage(1));
    setRole(e.target.value);
  };

  return (
    <section className="flex w-full flex-col gap-4 overflow-auto p-4">
      <Card className="w-full p-4 md:px-8 lg:px-10">
        <h1 className="text-lg font-bold tracking-wide md:text-xl lg:text-2xl">
          Users <span className="text-orange-600">List</span>
        </h1>
        <p className="text-sm text-slate-500 italic">
          The list of our user data
        </p>
      </Card>
      <Card className="flex w-full flex-col items-center justify-between gap-4 px-2 py-4 sm:flex-row md:px-8 lg:px-10">
        <div className="flex flex-wrap items-center gap-2">
          {roleList.map(({ id, name }) => (
            <button
              key={id}
              value={name}
              onClick={handleRoleButton}
              className={`cursor-pointer rounded-lg border px-2 py-1 text-sm outline-none hover:bg-orange-600 hover:text-white md:text-base ${role === name && "border-orange-600 bg-orange-600 text-white"}`}
            >
              {name}
            </button>
          ))}
        </div>
        <SearchBar value={search} onChange={handleChangeSearch} />
      </Card>
      {loading && users.length === 0 && (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      )}
      {!loading && users.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-lg font-semibold md:text-2xl">
            Users data not found!
          </p>
        </div>
      ) : (
        <UsersTable
          users={users}
          page={page}
          total={total}
          limit={limit}
          onLimitChange={(newLimit) => dispatch(asyncSetLimit(newLimit))}
          onPageChange={(newPage) => dispatch(asyncSetPage(newPage))}
        />
      )}
    </section>
  );
}

export default UsersPage;
