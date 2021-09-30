import { IMeetState } from "atoms/meetState";
import { findMeetAPI } from "lib/api/meet";
import { useEffect, useState } from "react";

export default function useFindMeet(meetId: string) {
  const [exist, setExist] = useState(null);
  const [meet, setMeet] = useState<IMeetState>();
  useEffect(() => {
    const getData = async () => {
      const response = await findMeetAPI(meetId);
      setExist(response.exist);
      setMeet(response.meet);
      console.log(meet);
    };
    getData();
  }, []);
  return {
    exist,
    meet,
  };
}
