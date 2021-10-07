import { schedulesState } from "atoms/calendarState";
import { readScheduleLinstAPI } from "lib/api/calendar";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function useCalendarEffect() {
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useRecoilState(schedulesState);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const schedules = await readScheduleLinstAPI();
        setSchedules(schedules);
        console.log(schedules);
      } catch (error) {
        alert("스케쥴 목록을 불러오는데 실패했습니다.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [setSchedules]);

  return {
    schedules,
    setSchedules,
    loading,
  };
}