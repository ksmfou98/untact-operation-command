import { userState } from "atoms/userState";
import { registerAPI } from "lib/api/auth";
import userStorage from "lib/userStorage";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";

export default function useAuth() {
  const history = useHistory();
  const setUserState = useSetRecoilState(userState);

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });

  const { email, password, name } = form;

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const user = await registerAPI(email, password, name);
        setUserState(user);
        userStorage.set(user);
        history.push("/");
      } catch (e) {
        alert("회원가입에 실패했습니다");
      }
    },
    [email, name, password, history, setUserState]
  );

  return {
    form,
    onChange,
    onRegister,
  };
}
