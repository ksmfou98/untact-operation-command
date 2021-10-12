import { schedulesState, scheduleState } from "atoms/calendarState";
import {
  createScheduleAPI,
  deleteScheduleAPI,
  updateScheduleAPI,
} from "lib/api/calendar";

import { useRecoilState, useSetRecoilState } from "recoil";

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
  const onDeleteSchedule = async (scheduleId: string) => {
    try {
      const schedules = await deleteScheduleAPI(scheduleId);
      setSchedules(schedules);
    } catch (e) {
      alert("게시물 삭제에 실패했습니다");
      console.log(e);
    }
  };
  const onCreateSchedule = async () => {
    try {
      const schedule = await createScheduleAPI(title, date, start, end);
      setSchedules((prev) => prev.concat(schedule));
      console.log(schedule);
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
        end
      );
      setSchedules(response);
      return response;
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
    onDeleteSchedule,
  };
}
