import { userState } from "atoms/userState";
import AuthError from "components/auth/AuthError";
import SettingNav from "components/setting/SettingNav";
import SettingProfileImg from "components/setting/SettingProfileImg";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const SettingPage = () => {
  const user = useRecoilValue(userState);
  if (!user._id) return <AuthError />;
  return (
    <>
      <SettingPageBlock>
        <SettingNav />
        <SettingProfileImg />
      </SettingPageBlock>
    </>
  );
};

export default SettingPage;

const SettingPageBlock = styled.div`
  margin: 50px 0px 0px 0px;
`;
