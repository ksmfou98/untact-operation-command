import { atom } from "recoil";

const userState = atom({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: {
    email: "",
    name: "",
    role: "",
    thumbnail: "",
    friends: [],
  }, // default value (aka initial value)
});

const calendarScheduleState = atom({
  key: "calendarScheduleState",
  default: {
    title: "",
    start: "",
    end: "",
    user: "",
  },
});

export { userState, calendarScheduleState };
