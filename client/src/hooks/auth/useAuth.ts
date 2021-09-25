import { registerAPI } from "lib/api/auth";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";

export default function useAuth() {
  const history = useHistory();

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
        const response = await registerAPI(email, password, name);
        history.push("/");
      } catch (e) {
        alert("회원가입에 실패했습니다");
      }
    },
    [email, name, password]
  );

  return {
    form,
    onChange,
    onRegister,
  };
}
