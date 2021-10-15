import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import styled from "styled-components";

const SettingNav = () => {
  return (
    <MembersNavBlock>
      <div className="title">
        <div className="item">
          <AiFillSetting />
        </div>
        <div className="item"> Setting</div>
      </div>
    </MembersNavBlock>
  );
};

const MembersNavBlock = styled.div`
  margin-top: 20px;
  .title {
    display: flex;
    .item {
      margin-right: 10px;
    }
  }
`;
export default SettingNav;
