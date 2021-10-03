import { scheduleState } from "atoms/calendarState";
import { readScheduleDetailAPI } from "lib/api/claendar";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// Id 값을 받아서 리코일에 넣어주는 함수
export default function useCalendarEditEffect(scheduleId: string) {
  const setSchedule = useSetRecoilState(scheduleState);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await readScheduleDetailAPI(scheduleId);
        setSchedule(response);
      } catch (error) {
        alert("스케쥴 상세보기를 불러오는데 실패했습니다.");
      }
    };
    if (scheduleId) getData();
  }, [scheduleId]);
}