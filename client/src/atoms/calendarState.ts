import { atom } from "recoil";
import { IUserState } from "atoms/userState";

export interface IScheduleState {
  _id: string;
  title: string;
  date: Date;
  start: string;
  end: string;
  user: IUserState;
}

export const initialScheduleState: IScheduleState = {
  _id: "",
  title: "",
  date: new Date(),
  start: "",
  end: "",
  user: {
    _id: "",
    email: "",
    name: "",
    role: "",
    thumbnail: "",
    friends: [],
  },
};

export const scheduleState = atom({
  key: "calendarScheduleState",
  default: initialScheduleState,
});

export const schedulesState = atom<IScheduleState[]>({
  key: "calendarSchedulesState",
  default: [],
});
