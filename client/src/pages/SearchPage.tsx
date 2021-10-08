import React from "react";
import MeetListItem from "components/home/MeetListItem";
import useSearchForm from "hooks/home/useSearchForm";
import useMeetSearchEffect from "hooks/home/useMeetSearchEffect";

const SearchPage = () => {
  const { onSearch, searchForm, searchFormOnChange } = useSearchForm();
  const { meets } = useMeetSearchEffect();

  return (
    <>
      <form onSubmit={onSearch}>
        <input type="text" value={searchForm} onChange={searchFormOnChange} />
        <button type="submit">검색</button>
      </form>
      {meets.map((meet, index) => (
        <MeetListItem key={index} meet={meet} />
      ))}
    </>
  );
};

export default SearchPage;
