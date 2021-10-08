import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <SeachBarBlock>
      <input type="text" placeholder="회의를 검색해주세요" />
      <button>
        <AiOutlineSearch size="22" />
      </button>
    </SeachBarBlock>
  );
};

const SeachBarBlock = styled.div``;

export default SearchBar;
