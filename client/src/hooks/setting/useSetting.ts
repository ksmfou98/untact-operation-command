import { userState } from "atoms/userState";
import useInput from "hooks/common/useInput";
import { updateUserInfoAPI, userProfileAPI } from "lib/api/setting";
import userStorage from "lib/userStorage";
import { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";

export default function useSetting() {
  const [user, setUser] = useRecoilState(userState);
  const { thumbnail, name } = user;
  const [imgURL, setImgURL] = useState(thumbnail);
  const history = useHistory();

  //이미지 업로드
  const imgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgURL(e.target.value);
    //빈파일이 아닌 경우 함수 진행
    if (e.target.files !== null) {
      //FormData 생성
      const fd = new FormData();
      //FormData에 key, value 추가하기
      fd.append("user_img", e.target.files[0]);
      // axios 사용해서 백엔드에게 파일 보내기
      try {
        const image = await userProfileAPI(fd);
        setImgURL(image);
      } catch (e) {
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  //유저 정보 수정
  const [updateName, onChangeUpdateName] = useInput(name);
  const [newPassword, onChangeNewPassword] = useInput("");
  const [newPasswordCheck, onChangeNewPasswordCheck] = useInput("");
  const [oldPassword, onChangeOldPassword] = useInput("");
  const onUpdateUserInfo = async () => {
    try {
      // const isMatch =; 추후에 추가
      console.log(updateName, oldPassword, newPassword);
      const user = await updateUserInfoAPI(
        imgURL,
        updateName,
        oldPassword,
        newPassword
      );
      setUser(user);
      userStorage.set(user);
      history.push("/");
      alert("유저 정보가 수정되었습니다.");
    } catch (e) {
      alert("유저 정보 수정에 실패했습니다");
    }
  };
  return {
    imgUpload,
    imgURL,
    onUpdateUserInfo,
    updateName,
    onChangeUpdateName,
    newPassword,
    onChangeNewPassword,
    oldPassword,
    onChangeOldPassword,
    newPasswordCheck,
    onChangeNewPasswordCheck,
  };
}
