import { searchMeetAPI } from "lib/api/meet";
import qs from "qs";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

export default function useMeetSearchEffect() {
  const [meets, setMeets] = useState([]);
  const location = useLocation();

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

  return {
    meets,
  };
}
