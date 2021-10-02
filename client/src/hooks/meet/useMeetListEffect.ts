import { meetsState } from "atoms/meetState";
import { readMeetListAPI } from "lib/api/meet";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

export default function useMeetListEffect() {
  const setMeets = useSetRecoilState(meetsState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const meets = await readMeetListAPI();
        console.log(meets);
        setMeets(meets);
      } catch (e) {
        alert("회의 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [setMeets]);

  return {
    loading,
  };
}
