import { IUserState } from "atoms/userState";

const key = "USER";

const userStorage = {
  get() {
    const data = localStorage.getItem(key);
    try {
      if (!data) return null;
      const parsed = JSON.parse(data) as IUserState;
      return parsed;
    } catch (e) {
      localStorage.removeItem(key);
      return null;
    }
  },
  set(user: IUserState) {
    localStorage.setItem(key, JSON.stringify(user));
  },
  remove() {
    localStorage.removeItem(key);
  },
};

export default userStorage;
