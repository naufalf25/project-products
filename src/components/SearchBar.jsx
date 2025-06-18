import React from "react";
import PropTypes from "prop-types";
import { MdSearch } from "react-icons/md";
import { TextField } from "@mui/material";

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <div className="flex w-full items-center gap-2 md:w-auto">
      <MdSearch className="text-2xl text-slate-400" />
      <TextField
        variant="standard"
        type="text"
        className="w-full"
        placeholder="Search"
        value={value}
        onChange={onChange}
        onKeyDown={onSubmit}
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
