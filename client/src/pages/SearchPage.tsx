import qs from "qs";
import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router";
import { useRecoilValue } from "recoil";
import { meetsState } from "atoms/meetState";
import MeetListItem from "components/home/MeetListItem";

export interface SearchPageProps extends RouteComponentProps {}

const SearchPage = ({ location }: SearchPageProps) => {
  const query = useMemo(() => {
    const parsed = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { q: string };
    return parsed;
  }, [location.search]);

  const meets = useRecoilValue(meetsState);

  return (
    <>
      <input type="text" />
      {meets.map((meet) => (
        <MeetListItem meet={meet} />
      ))}
    </>
  );
};

export default SearchPage;
