import React from "react";
import MeetListItem from "components/home/MeetListItem";
import useSearchForm from "hooks/home/useSearchForm";
import useMeetSearchEffect from "hooks/home/useMeetSearchEffect";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import media from "lib/styles/media";

const SearchPage = () => {
  const { onSearch, searchForm, searchFormOnChange } = useSearchForm();
  const { meets } = useMeetSearchEffect();

  return (
    <SearchPageBlock>
      <SearchFormStyled onSubmit={onSearch}>
        <div className="inner-form">
          <input
            type="text"
            value={searchForm}
            onChange={searchFormOnChange}
            placeholder="검색어를 입력해주세요"
          />
          <button type="submit">
            <AiOutlineSearch size="30" />
          </button>
        </div>
      </SearchFormStyled>
      <MeetListStyled>
        {meets.map((meet, index) => (
          <MeetListItem key={index} meet={meet} />
        ))}
      </MeetListStyled>
    </SearchPageBlock>
  );
};

const SearchPageBlock = styled.div``;

const SearchFormStyled = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  .inner-form {
    position: relative;
    width: 50%;
    input {
      width: 100%;
      height: 55px;
      padding: 0 60px 0 14px;
      border: 1px solid #f7f7f6;
      border-radius: 18px;
      background-color: #f7f7f7;
      font-weight: 400;
      font-size: 18px;
      color: #666;
      line-height: 16px;
      outline: none;
    }
    button {
      position: absolute;
      right: 10px;
      top: 10px;
      svg {
        color: #726f6f;
      }
    }
    ${media.medium} {
      width: 80%;
    }
    ${media.small} {
      width: 100%;
      input {
        height: 40px;
        font-size: 14px;
      }
      button {
        top: 5px;
        svg {
          width: 24px;
        }
      }
    }
  }
`;

const MeetListStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default SearchPage;
