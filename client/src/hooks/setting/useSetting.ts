import { updateUserInfoAPI, userProfileAPI } from "lib/api/setting";
import { useState } from "react";

export default function useSetting() {
  const [imgURL, setImgURL] = useState("");

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

  const onUpdateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserInfoAPI(imgURL);
    } catch (e) {
      alert("정보수정에 실패했습니다");
    }
  };
  return {
    imgUpload,
    imgURL,
    onUpdateUserInfo,
  };
}
