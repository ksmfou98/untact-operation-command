import useInput from "hooks/common/useInput";
import media from "lib/styles/media";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useHistory } from "react-router";
import styled from "styled-components";

const SearchBar = () => {
  const [searchForm, searchFormOnChange] = useInput("");
  const history = useHistory();

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search?q=${searchForm}`);
  };

  return (
    <SeachBarBlock onSubmit={onSearch}>
      <input
        type="text"
        value={searchForm}
        onChange={searchFormOnChange}
        placeholder="회의를 검색해주세요"
      />
      <button type="submit">
        <AiOutlineSearch size="22" />
      </button>
    </SeachBarBlock>
  );
};

const SeachBarBlock = styled.form`
  position: relative;
  margin-right: 20px;
  input {
    width: 100%;
    height: 36px;
    padding: 0 60px 0 14px;
    border: 1px solid #f7f7f6;
    border-radius: 18px;
    background-color: #f7f7f7;
    font-weight: 400;
    font-size: 12px;
    color: #666;
    line-height: 16px;
    outline: none;
    ${media.custom(980)} {
      width: 175px;
      height: 36px;
    }
  }
  button {
    position: absolute;
    right: 3px;
    top: 5px;
  }
`;

export default SearchBar;
