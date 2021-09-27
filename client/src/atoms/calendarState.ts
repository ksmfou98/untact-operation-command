import { atom } from "recoil";
import { IUserState } from "atoms/userState";

export interface IScheduleState {
  _id: string;
  title: string;
  date: string;
  start: string;
  end?: string;
  user: IUserState;
}

const initialState: IScheduleState = {
  _id: "",
  title: "",
  date: "",
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
  key: "scheduleState",
  default: initialState,
});
