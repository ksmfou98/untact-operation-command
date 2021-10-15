import SettingNav from "components/setting/SettingNav";
import SettingProfileImg from "components/setting/SettingProfileImg";
import styled from "styled-components";

const SettingPage = () => {
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
