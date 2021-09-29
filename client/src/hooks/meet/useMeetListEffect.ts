import { readMeetListAPI } from "lib/api/meet";
import { useEffect, useState } from "react";

export default function useMeetListEffect() {
  const [meets, setMeets] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const meets = await readMeetListAPI();
      setMeets(meets);
    };
    getData();
  }, []);
  return {
    meets,
  };
}
