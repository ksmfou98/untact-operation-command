import { schedulesState, scheduleState } from "atoms/calendarState";
import { createScheduleAPI, updateScheduleAPI } from "lib/api/calendar";

import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

export default function useCalendarForm() {
  const setSchedules = useSetRecoilState(schedulesState);
  const [schedule, setSchedule] = useRecoilState(scheduleState);
  const { start, date, title, end, _id } = schedule;
  const onChangeSchedule = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchedule((prev) => ({ ...prev, [name]: value }));

  };

  const onChangeScheduleDate = (dates: Date) => {
    setSchedule((prev) => ({ ...prev, date: dates }));

  };

  const onCreateSchedule = async () => {
    try {
      const response = await createScheduleAPI(title, date, start, end);
      setSchedules((prev) => prev.concat(response));
      console.log(response);
      return response.data;
    } catch (e) {
      alert("게시물 작성에 실패했습니다");
      console.log(e);
    }
  };
  const onUpdateSchedule = async () => {
    const scheduleId = _id;
    try {
      const response = await updateScheduleAPI(
        scheduleId,
        title,
        date,
        start,
        end,

      );
      console.log("이거 나오면 성공");
      setSchedules(response)
      return response
    } catch (e) {
      alert("게시물 수정에 실패했습니다");
      console.log(e);
    }
  };
  return {
    onChangeSchedule,
    onCreateSchedule,
    onChangeScheduleDate,
    onUpdateSchedule,
  };
}
