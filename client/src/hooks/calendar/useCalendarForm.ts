import { scheduleState } from "atoms/calendarState";
import { createScheduleAPI } from "lib/api/claendar";
import { useRecoilState } from "recoil";

export default function useCalendarForm() {
  const [schedule, setSchedule] = useRecoilState(scheduleState);
  const { start, date, title, end } = schedule;

  const onChangeSchedule = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const onCreateSchedule = async () => {
    try {
      await createScheduleAPI(title, date, start, end);
    } catch (e) {
      alert("게시물 작성에 실패했습니다");
      console.log(e);
    }
  };

  return {
    onChangeSchedule,
    onCreateSchedule,
  };
}
