import useInput from "hooks/common/useInput";
import qs from "qs";
import { useMemo } from "react";
import { useHistory, useLocation } from "react-router";

export default function useSearchForm() {
  const history = useHistory();
  const location = useLocation();

  const query = useMemo(() => {
    const parsed = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { q: string };
    return parsed;
  }, [location.search]);

  const [searchForm, searchFormOnChange] = useInput(query.q ? query.q : "");
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchForm.length === 0) return false;
    history.push(`/search?q=${searchForm}`);
  };

  return {
    searchForm,
    searchFormOnChange,
    onSearch,
  };
}
