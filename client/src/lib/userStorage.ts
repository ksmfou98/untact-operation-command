import { IUserState } from "atoms/userState";

const key = "USER";

const userStorage = {
  get() {
    const data = sessionStorage.getItem(key);
    try {
      if (!data) return null;
      const parsed = JSON.parse(data) as IUserState;
      return parsed;
    } catch (e) {
      sessionStorage.removeItem(key);
      return null;
    }
  },
  set(user: IUserState) {
    sessionStorage.setItem(key, JSON.stringify(user));
  },
  remove() {
    sessionStorage.removeItem(key);
  },
};

export default userStorage;
