import { atom } from "recoil";
import { IUserState } from "atoms/userState";
import { now } from "moment";

export interface IScheduleState {
  _id: string;
  title: string;
  start: Date;
  end: Date;
  user: IUserState;
}

const initialState: IScheduleState = {
  _id: "",
  title: "",
  start: new Date(),
  end: new Date(),
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
  default: initialState,
});
