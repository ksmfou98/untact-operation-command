import { atom } from "recoil";

export interface IUserState {
  _id: string;
  email: string;
  name: string;
  role: string;
  thumbnail: string;
  friends: IUserState[];
}

export const initialUserState: IUserState = {
  _id: "",
  email: "",
  name: "",
  role: "",
  thumbnail: "",
  friends: [],
};

export const userState = atom<IUserState>({
  key: "userState",
  default: initialUserState,
});
