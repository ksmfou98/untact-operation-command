import { useEffect, useState } from "react";
import { readScheduleLinstAPI } from "lib/api/calendar";
import { useRecoilState, useRecoilValue } from "recoil";
import { schedulesState, scheduleState } from "atoms/calendarState";
import useCalendarModal from "hooks/common/useCalendarModal";

export default function useCalendarEffect() {
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useRecoilState(schedulesState);
  const { isModal, onToggleModal, isEdit, onEditToggleModal } =
    useCalendarModal();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const schedules = await readScheduleLinstAPI();
        setSchedules(schedules);
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
    isModal,
    onToggleModal,
    isEdit,
    onEditToggleModal,
    loading,
  };
}
