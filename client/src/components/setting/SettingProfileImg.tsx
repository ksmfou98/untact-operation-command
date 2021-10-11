import useSetting from "hooks/setting/useSetting";
import { SERVER_URL } from "lib/config";
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import NoIMG from "assets/image/notExistMeet.png";
import styled from "styled-components";
import media from "lib/styles/media";
import { palette } from "lib/styles/palette";

const SettingProfileImg = () => {
  const { imgUpload, imgURL, onUpdateUserInfo } = useSetting();
  return (
    <ProfileBlock>
      <form onSubmit={onUpdateUserInfo}>
        <div className="profileImg">
          <ImgPreview>
            {!imgURL && <img src={NoIMG} alt="" className="img-preview" />}
            {imgURL && (
              <img
                src={`${SERVER_URL}/${imgURL}`}
                alt=""
                className="img-preview"
              />
            )}
          </ImgPreview>
          <ImgBox>
            <div className="inner-input">
              <label htmlFor="img-upload">
                <AiOutlineCloudUpload size="25" />
              </label>
              <input
                type="file"
                id="img-upload"
                className="image-upload"
                onChange={imgUpload}
              />
            </div>
          </ImgBox>
        </div>
        <InfoBox>
          <div className="nameDescrip">이름</div>
          <div>
            <input type="text" className="inputEle" />
          </div>
        </InfoBox>
        <InfoBox>
          <div className="nameDescrip">이메일</div>
          <div>
            <input type="text" className="inputEle" readOnly />
          </div>
        </InfoBox>
        <InfoBox>
          <div className="nameDescrip">현재 비밀번호</div>
          <div>
            <input type="text" className="inputEle" />
          </div>
          <div className="nameDescrip">변경할 비밀번호</div>
          <div>
            <input type="text" className="inputEle" />
          </div>
          <div className="nameDescrip">비밀번호 확인</div>
          <div>
            <input type="text" className="inputEle" />
          </div>
        </InfoBox>

        <div className="create-btn">
          <button type="submit">정보수정</button>
        </div>
      </form>
    </ProfileBlock>
  );
};

export default SettingProfileImg;

const ProfileBlock = styled.div`
  margin-top: 50px;
  form {
    width: 350px;
    margin: 0 auto;
  }
  .title {
    font-size: 20px;
  }
`;

const ImgPreview = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 100px;
  .img-preview {
    width: 100px;
    object-fit: fill;
    border-radius: 30%;
    border: 2px solid ${palette.border};
    margin-bottom: 20px;
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  .inner-input {
    display: flex;
  }
`;
const InfoBox = styled.div`
  margin-top: 40px;
  .nameDescrip {
    color: #6e6e6e;
    font-size: 15px;
    margin-right: 140px;
    margin-bottom: 8px;
    margin-top: 10px;
  }
  .inputEle {
    height: 30px;
    border-radius: 5px;
    width: 100%;
  }
`;
