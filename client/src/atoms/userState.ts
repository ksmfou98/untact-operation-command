import { atom } from "recoil";

export interface IUserState {
  _id: string;
  email: string;
  name: string;
  role: string;
  token: string;
  thumbnail: string;
  friends: IUserState[];
}

const initialState: IUserState = {
  _id: "",
  email: "",
  name: "",
  role: "",
  token: "",
  thumbnail: "",
  friends: [],
};

export const userState = atom({
  key: "userState",
  default: initialState,
});
