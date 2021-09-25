import { atom } from "recoil";

const calendarScheduleState = atom({
  key: "calendarScheduleState",
  default: {
    title: "",
    start: "",
    end: "",
    user: "",
  },
});

export { calendarScheduleState };
