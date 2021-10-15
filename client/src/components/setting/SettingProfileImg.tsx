import useSetting from "hooks/setting/useSetting";
import { SERVER_URL } from "lib/config";
import { AiOutlineCloudUpload } from "react-icons/ai";
import NoIMG from "assets/image/notExistMeet.png";
import styled from "styled-components";
import { palette } from "lib/styles/palette";
import { useRecoilValue } from "recoil";
import { userState } from "atoms/userState";
import media from "lib/styles/media";

const SettingProfileImg = () => {
  const {
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
  } = useSetting();
  const user = useRecoilValue(userState);
  return (
    <ProfileBlock>
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
          <input
            type="text"
            className="inputEle"
            value={updateName}
            onChange={onChangeUpdateName}
          />
        </div>
      </InfoBox>
      <InfoBox>
        <div className="nameDescrip">이메일</div>
        <div>
          <input type="text" className="inputEle" value={user.email} readOnly />
        </div>
      </InfoBox>
      <InfoBox>
        <div className="nameDescrip">현재 비밀번호</div>
        <div>
          <input
            type="text"
            className="inputEle"
            value={oldPassword}
            onChange={onChangeOldPassword}
          />
        </div>
        <div className="nameDescrip">변경할 비밀번호</div>
        <div>
          <input
            type="text"
            className="inputEle"
            value={newPassword}
            onChange={onChangeNewPassword}
          />
        </div>
        <div className="nameDescrip">비밀번호 확인</div>
        <div>
          <input
            type="text"
            className="inputEle"
            value={newPasswordCheck}
            onChange={onChangeNewPasswordCheck}
          />
        </div>
      </InfoBox>

      <div className="create-btn">
        <button className="btn" onClick={onUpdateUserInfo}>
          정보수정
        </button>
      </div>
    </ProfileBlock>
  );
};

export default SettingProfileImg;

const ProfileBlock = styled.div`
  margin-top: 50px;
  width: 350px;
  margin: 0 auto;

  .title {
    font-size: 20px;
  }
  .create-btn {
    text-align: center;
    margin: 40px;
    .btn {
      color: white;
      font-weight: bold;
      text-align: center;
      background-color: ${palette.mainColor};
      border-radius: 5px;
      width: 6rem;
      height: 2rem;
    }
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
    height: 33px;
    border-radius: 5px;
    width: 90%;
    border: 1px solid ${palette.mainColor};
  }

  /* ${media.small} {
    .inputEle {
      width: 90%;
    }
  } */
`;
