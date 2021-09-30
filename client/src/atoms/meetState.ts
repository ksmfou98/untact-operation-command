import { atom } from "recoil";
import { initialUserState, IUserState } from "./userState";

export interface IMeetState {
  host: IUserState;
  title: string;
  _id: string;
  description: string;
  thumbnail: string;
  password: string;
  muted: boolean;
  videoOff: boolean;
}

export const initialMeetState: IMeetState = {
  host: initialUserState,
  _id: "",
  title: "",
  description: "",
  thumbnail: "회의 썸네일을 업로드 해주세요",
  password: "",
  muted: false,
  videoOff: false,
};

export const meetState = atom<IMeetState>({
  key: "meetState",
  default: initialMeetState,
});

export const meetsState = atom<IMeetState[]>({
  key: "meetsState",
  default: [],
});
