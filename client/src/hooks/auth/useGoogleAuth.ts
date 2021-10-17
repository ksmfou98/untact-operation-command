import { userState } from "atoms/userState";
import { googleLoginAPI, googleRegisterAPI } from "lib/api/auth";
import userStorage from "lib/userStorage";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";

export default function useGoogleAuth() {
  const history = useHistory();
  const setUserState = useSetRecoilState(userState);

  const onRegisterSuccess = async (response: any) => {
    const { accessToken } = response;

    try {
      const user = await googleRegisterAPI(accessToken);
      setUserState(user);
      userStorage.set(user);
      history.push("/");
    } catch (e) {
      alert("회원가입에 실패했습니다.");
    }
  };
  const onRegisterFailure = (error: any) => {
    console.log(error);
  };

  const onLoginSuccess = async (response: any) => {
    const { accessToken } = response;

    try {
      const user = await googleLoginAPI(accessToken);
      setUserState(user);
      userStorage.set(user);
      history.push("/");
    } catch (e) {
      alert("로그인에 실패했습니다.");
    }
  };

  const onLoginFailure = (error: any) => {
    console.log(error);
  };

  return {
    onRegisterSuccess,
    onRegisterFailure,
    onLoginSuccess,
    onLoginFailure,
  };
}
