import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="SearchForm">
      <input
        className="SearchInput"
        placeholder="Search film..."
        id="search"
        type="search"
      />
      <label htmlFor="search" className="SearchLabel">
        <button type="submit" className="SearchButton">
          <FaSearch aria-label="search" />
        </button>
      </label>
    </form>
  );
}

export { SearchForm };
