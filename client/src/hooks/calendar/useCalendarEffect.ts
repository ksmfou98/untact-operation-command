import { useEffect } from "react";
import { readScheduleLinstAPI } from "lib/api/claendar";
import { useRecoilState } from "recoil";
import { schedulesState, scheduleState } from "atoms/calendarState";
import { EventClickArg } from "@fullcalendar/common";
import useCalendarModal from "hooks/common/useCalendarModal";

export default function useCalendarEffect() {
  // const [schedules, setSchedules] = useState([]);
  const [schedules, setSchedules] = useRecoilState(schedulesState);
  const [schedule, setSchedule] = useRecoilState(scheduleState);
  const { isModal, onToggleModal, isEdit, onEditToggleModal } =
    useCalendarModal();
  useEffect(() => {
    const getData = async () => {
      const schedules = await readScheduleLinstAPI();
      setSchedules(schedules);
      console.log(schedules);
    };
    getData();
  }, [setSchedules]);

  //fullcalendar 에서 이벤트 클릭시
  const onEventClick = (clickInfo: EventClickArg) => {
    setSchedule((prev) => ({
      ...prev,
      _id: clickInfo.event._def.extendedProps._id,
    })); //_id값을 리코일에 저장
    
    onEditToggleModal();
  };

  return {
    schedules,
    setSchedules,
    onEventClick,
    schedule,
    isModal,
    onToggleModal,
    isEdit,
    onEditToggleModal,
  };
}
