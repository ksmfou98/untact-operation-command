import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import { BsPeopleCircle } from "react-icons/bs";
import AsideMenu from "./AsideMenu";
import media from "lib/styles/media";
import { useRecoilValue } from "recoil";
import { userState } from "atoms/userState";

const Aside = () => {
  const user = useRecoilValue(userState);

  return (
    <AsideBlock>
      <AsideTitle>
        <div className="profile-img">
          <BsPeopleCircle size="40" />
        </div>
        <div className="user-name">{user.name}</div>
      </AsideTitle>

      <AsideMenu />
    </AsideBlock>
  );
};

const AsideBlock = styled.aside`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: ${palette.mainColor};
  box-shadow: 3px 14px 15px 1px rgba(90, 90, 90, 0.15);
  z-index: 2;
  padding: 40px 10px 40px 20px;
  color: #fff;
  ${media.xlarge} {
    width: 80px;
    padding-left: 5px;
    padding-right: 5px;
  }
  ${media.small} {
    display: none;
  }
`;

const AsideTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 65px;

  .profile-img {
    margin-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user-name {
    font-size: 20px;
    font-weight: 400;
  }

  ${media.xlarge} {
    justify-content: center;
    .profile-img {
      margin-right: 0;
    }
    .user-name {
      display: none;
    }
  }
`;

export default Aside;
