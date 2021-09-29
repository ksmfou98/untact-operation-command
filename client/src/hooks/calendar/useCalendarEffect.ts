import { useEffect } from "react";
import { readScheduleLinstAPI } from "lib/api/claendar";
import { useRecoilState } from "recoil";
import { schedulesState } from "atoms/calendarState";

export default function useCalendarEffect() {
  // const [schedules, setSchedules] = useState([]);
  const [schedules, setSchedules] = useRecoilState(schedulesState);
  useEffect(() => {
    const getData = async () => {
      const schedules = await readScheduleLinstAPI();
      setSchedules(schedules);
      console.log(schedules);
    };
    getData();
  }, [setSchedules]); //나중에 조건 달거임.

  return { schedules, setSchedules };
}
