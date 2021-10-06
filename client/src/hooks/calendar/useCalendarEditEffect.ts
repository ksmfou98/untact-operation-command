import { scheduleState } from "atoms/calendarState";
import { readScheduleDetailAPI } from "lib/api/calendar";
import moment from "moment";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// Id 값을 받아서 리코일에 넣어주는 함수
export default function useCalendarEditEffect(scheduleId: string) {
  const setSchedule = useSetRecoilState(scheduleState);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await readScheduleDetailAPI(scheduleId);
        setSchedule((prev) => ({
          ...prev,
          title: response.title,
          date: new Date(moment(response.start).format("yyyy-MM-DD")),
          start: moment(response.start).format("HH:mm:ss"),
          end: moment(response.end).format("HH:mm:ss"),
        }));
      } catch (error) {
        alert("스케쥴 상세보기를 불러오는데 실패했습니다.");
      }
    };
    if (scheduleId) getData();
  }, [scheduleId]);
}
