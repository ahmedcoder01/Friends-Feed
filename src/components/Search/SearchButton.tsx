import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SearchButton = (): JSX.Element => {
  //TODO: Implement search functionality within the current page
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-ghost btn-circle"
      onClick={() => navigate("/search")}
    >
      <AiOutlineSearch size="20px" />
    </button>
  );
};

export default SearchButton;
