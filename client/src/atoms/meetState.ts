import { atom } from "recoil";
import { initialUserState, IUserState } from "./userState";

export interface IMeetState {
  host: IUserState;
  title: string;
  description: string;
  thumbnail: string;
  password: string;
  muted: boolean;
  videoOff: boolean;
}

export const initialMeetState: IMeetState = {
  host: initialUserState,
  title: "",
  description: "",
  thumbnail: "",
  password: "",
  muted: false,
  videoOff: false,
};

export const meetState = atom<IMeetState>({
  key: "meetState",
  default: initialMeetState,
});
