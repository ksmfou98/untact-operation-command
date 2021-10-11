import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import { BsPeopleCircle } from "react-icons/bs";
import AsideMenu from "./AsideMenu";
import media from "lib/styles/media";
import { useRecoilValue } from "recoil";
import { userState } from "atoms/userState";
import { Link } from "react-router-dom";
import { SERVER_URL } from "lib/config";

const Aside = () => {
  const user = useRecoilValue(userState);
  console.log(user);
  return (
    <AsideBlock>
      <AsideTitle>
        <div className="profile-img">
          {/* <BsPeopleCircle size="40" /> */}
          {user.thumbnail ? (
            <img
              src={`${SERVER_URL}/${user.thumbnail}`}
              alt=""
              className="userProfile"
            />
          ) : (
            <BsPeopleCircle size="40" />
          )}
        </div>
        {user?.name ? (
          <div className="user-name">{user.name}</div>
        ) : (
          <Link to="/login" className="user-name">
            로그인
          </Link>
        )}
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
    display: inline-block;
    margin-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .userProfile {
      max-width: 40px;
      border-radius: 30%;
      object-fit: fill;
    }
  }

  .user-name {
    font-size: 20px;
    font-weight: 400;
  }

  ${media.xlarge} {
    justify-content: center;
    flex-direction: column;
    .profile-img {
      margin-right: 0;
      margin-bottom: 12px;
    }
    .user-name {
      font-size: 14px;
    }
  }
`;

export default Aside;
