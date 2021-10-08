import useInput from "hooks/common/useInput";
import { useHistory } from "react-router";

export default function useSearchForm() {
  const [searchForm, searchFormOnChange] = useInput("");
  const history = useHistory();

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
