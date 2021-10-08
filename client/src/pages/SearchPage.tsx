import qs from "qs";
import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router";

export interface SearchPageProps extends RouteComponentProps {}

const SearchPage = ({ location }: SearchPageProps) => {
  const query = useMemo(() => {
    const parsed = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { q: string };
    return parsed;
  }, [location.search]);

  return <div>SearchPage</div>;
};

export default SearchPage;
