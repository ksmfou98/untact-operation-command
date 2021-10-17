import { atom } from "recoil";

export interface IUserState {
  _id: string;
  email: string;
  name: string;
  role: string;
  provider: string;
  thumbnail: string;
  friends: IUserState[];
}

export const initialUserState: IUserState = {
  _id: "",
  email: "",
  name: "",
  role: "",
  provider: "",
  thumbnail: "",
  friends: [],
};

export const userState = atom<IUserState>({
  key: "userState",
  default: initialUserState,
});

export const friendsState = atom<IUserState[]>({
  key: "friendsState",
  default: [],
});
