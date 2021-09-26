import userStorage from "lib/userStorage";
import { MutableSnapshot } from "recoil";
import { userState } from "./userState";

export default function recoilInitializer({ set }: MutableSnapshot) {
  const user = userStorage.get();
  if (user) {
    set(userState, user);
  }
}
