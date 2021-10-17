import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import styled from "styled-components";

const MembersNav = () => {
  return (
    <MembersNavBlock>
      <div className="title">
        <div className="item">
          <IoPeopleOutline />
        </div>
        <div className="item"> Members</div>
      </div>
    </MembersNavBlock>
  );
};

const MembersNavBlock = styled.div`
  .title {
    display: flex;
    .item {
      margin-right: 10px;
    }
  }
`;
export default MembersNav;
