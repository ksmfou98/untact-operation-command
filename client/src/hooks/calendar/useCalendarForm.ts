import { initialScheduleState, scheduleState } from "atoms/calendarState";
import { createScheduleAPI } from "lib/api/claendar";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function useCalendarForm() {
  const [schedule, setSchedule] = useRecoilState(scheduleState);
  const { start, date, title, end } = schedule;
  const onChangeSchedule = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchedule((prev) => ({ ...prev, [name]: value }));
    console.log(schedule);
  };

  const onChangeScheduleDate = (dates: Date) => {
    setSchedule((prev) => ({ ...prev, date: dates }));
    console.log(schedule);
  };

  const onCreateSchedule = async () => {
    try {
      await createScheduleAPI(title, date, start, end);
      setSchedule(initialScheduleState);
    } catch (e) {
      alert("게시물 작성에 실패했습니다");
      console.log(e);
    }
  };

  return {
    onChangeSchedule,
    onCreateSchedule,
    onChangeScheduleDate,
  };
}
