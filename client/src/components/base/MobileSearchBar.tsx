import { palette } from "lib/styles/palette";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

const MobileSearchBar = () => {
  return (
    <MobileSearchBarBlock>
      <SearchInput placeholder="회의 검색 .." />
      <SearchButton>
        <AiOutlineSearch size="20" />
      </SearchButton>
    </MobileSearchBarBlock>
  );
};

const MobileSearchBarBlock = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  border: 1px solid ${palette.border};
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  outline: none;

`;
const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 5px;
  svg {
    color: #464646;
  }
`;

export default MobileSearchBar;
