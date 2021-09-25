import { atom } from "recoil";

export const scheduleState = atom({
  key: "calendarScheduleState",
  default: {
    title: "",
    start: "",
    end: "",
    user: "",
  },
});
