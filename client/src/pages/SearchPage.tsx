import qs from "qs";
import React, { useEffect, useMemo, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import MeetListItem from "components/home/MeetListItem";
import { searchMeetAPI } from "lib/api/meet";
import useInput from "hooks/common/useInput";
import useSearchForm from "hooks/home/useSearchForm";

export interface SearchPageProps extends RouteComponentProps {}

const SearchPage = ({ location }: SearchPageProps) => {
  const [meets, setMeets] = useState([]);

  const { onSearch, searchForm, searchFormOnChange } = useSearchForm();

  const query = useMemo(() => {
    const parsed = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { q: string };
    return parsed;
  }, [location.search]);

  useEffect(() => {
    const getData = async () => {
      const meets = await searchMeetAPI(query.q);
      setMeets(meets);
    };
    getData();
  }, [query.q]);

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
