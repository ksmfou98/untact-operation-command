import useSetting from "hooks/setting/useSetting";
import { SERVER_URL } from "lib/config";
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import NoIMG from "assets/image/notExistMeet.png";
const SettingPage = () => {
  const { imgUpload, imgURL, onUpdateUserInfo } = useSetting();
  return (
    <form onSubmit={onUpdateUserInfo}>
      <div className="create-row">
        <div className="inner-row">
          <label>유저 프로필 이미지</label>
          <div className="inner-input">
            <label htmlFor="img-upload">
              <span>{imgURL}</span>
              <AiOutlineCloudUpload size="25" />
            </label>
            <input
              type="file"
              id="img-upload"
              className="image-upload"
              onChange={imgUpload}
            />
          </div>
          <div className="img-preview">
            {!imgURL && <img src={NoIMG} alt="" />}
            {imgURL && <img src={`${SERVER_URL}/${imgURL}`} alt="" />}
          </div>
        </div>
        <div className="create-btn">
          <button type="submit">정보수정</button>
        </div>
      </div>
    </form>
  );
};

export default SettingPage;
