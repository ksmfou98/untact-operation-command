import { useEffect, useState } from "react";
import { readScheduleLinstAPI } from "lib/api/claendar";

export default function useCalendarEffect() {
  const [schedules, setSchedules] = useState([]);



  useEffect(() => {
    const getData = async () => {
      const schedules = await readScheduleLinstAPI();
      setSchedules(schedules);
    };
    getData();
  }, []); //나중에 조건 달거임.

  return { schedules };
}
