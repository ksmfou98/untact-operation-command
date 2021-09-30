import { IMeetState } from "atoms/meetState";
import { MeetParams } from "components/meet/Meet";
import { findMeetAPI } from "lib/api/meet";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function useFindMeet() {
  const { meetId } = useParams<MeetParams>();
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
