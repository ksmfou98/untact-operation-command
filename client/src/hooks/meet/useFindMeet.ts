import { IMeetState } from "atoms/meetState";
import { MeetParams } from "components/meet/Meet";
import { findMeetAPI } from "lib/api/meet";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function useFindMeet() {
  const { meetId } = useParams<MeetParams>();
  const [exist, setExist] = useState(null);
  const [meet, setMeet] = useState<IMeetState>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await findMeetAPI(meetId);
        setExist(response.exist);
        setMeet(response.meet);
      } catch (e) {
        alert("회의를 찾는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [meetId]);
  return {
    loading,
    exist,
    meet,
  };
}
