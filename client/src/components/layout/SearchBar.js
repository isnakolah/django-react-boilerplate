import React, { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const onChange = ({ target }) => {
    setSearch(target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <div className="p-2">
      <form className="form-inline my-2 my-lg-0" onSubmit={onSubmit}>
        <input
          className="form-control mr-sm-2 rounded border-white"
          type="search"
          name="search"
          placeholder="Search"
          value={search}
          onChange={onChange}
        />
        <button
          className="btn btn-outline-light my-2 my-sm-0 rounded"
          type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
