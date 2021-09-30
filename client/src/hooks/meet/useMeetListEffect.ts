import { meetsState } from "atoms/meetState";
import { readMeetListAPI } from "lib/api/meet";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function useMeetListEffect() {
  const setMeets = useSetRecoilState(meetsState);

  useEffect(() => {
    const getData = async () => {
      const meets = await readMeetListAPI();
      setMeets(meets);
    };
    getData();
  }, []);
}
