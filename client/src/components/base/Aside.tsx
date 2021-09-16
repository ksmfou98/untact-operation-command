import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import { BsPeopleCircle } from "react-icons/bs";

const Aside = () => {
  return (
    <AsideBlock>
      <AsideTitle>
        <div className="profile-img">
          <BsPeopleCircle size="40" />
        </div>
        <div className="user-name">이도현</div>
      </AsideTitle>
    </AsideBlock>
  );
};

const AsideBlock = styled.aside`
  position: fixed;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: ${palette.mainColor};
  box-shadow: 3px 14px 15px 1px rgba(90, 90, 90, 0.15);
  z-index: 2;
  padding: 40px 10px;
  color: #fff;
`;

const AsideTitle = styled.div`
  display: flex;
  align-items: center;
  .profile-img {
    margin-right: 30px;
  }
  .user-name {
    font-size: 20px;
    font-weight: 400;
  }
`;

export default Aside;
