import { scheduleState } from "atoms/calendarState";
import { useRecoilState } from "recoil";

export default function useCalendarForm() {
  const [schedule, setSchedule] = useRecoilState(scheduleState);

  const onChangeSchedule = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const onCreateSchedule = () => {
    
  };

  return {
    onChangeSchedule,
    onCreateSchedule,
  };
}
