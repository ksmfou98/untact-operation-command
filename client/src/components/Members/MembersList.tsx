import React from "react";
import styled from "styled-components";
import { BsFillPersonFill, BsTrash } from "react-icons/bs";

const MembersList = () => {
  const fakeDatas = [
    {
      email: "string",
      password: "string",
      name: "string",
      role: "string",
      thumbnail: "string",
      friends: "string",
      token: "string",
    },
    {
      email: "string",
      password: "string",
      name: "string",
      role: "string",
      thumbnail: "string",
      friends: "string",
      token: "string",
    },
  ];
  return (
    <MenberListBlock>
      {fakeDatas &&
        fakeDatas.map((data, index) => (
          <div key={index}>
            <List>
              <ListEle>
                <div className="profile">
                  <BsFillPersonFill />
                  {/* 여기에 프로필사진 */}
                </div>
                <div className="friendName">{data.name}</div>
              </ListEle>
              <ListEle>
                <div className="call">1:1 채팅신청</div>
                <div className="delFriend">
                  <BsTrash size="22" />
                </div>
              </ListEle>
            </List>
          </div>
        ))}
      <List>
        <ListEle>
          <div className="emptyProfile"></div>
          <div className="addName">Add New</div>
        </ListEle>
      </List>
    </MenberListBlock>
  );
};

const MenberListBlock = styled.div`
  margin: 50px 150px 0px 25px;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  &:hover {
    background-color: rgb(240, 245, 249);
    .delFriend {
      color: rgb(142, 155, 164);
    }
  }
`;

const ListEle = styled.div`
  display: flex;
  align-items: center;
  .profile {
    width: 30px;
    height: 30px;
    background-color: #d5d3d3;
    border-radius: 100%;
    text-align: center;
    margin: 0px 15px;
    line-height: 30px;
  }
  .friendName {
    font-weight: bold;
  }
  .addName {
    color: rgb(116, 144, 167);
  }
  .emptyProfile {
    cursor: pointer;
    border: 1px dashed #d5d3d3;
    width: 35px;
    height: 35px;
    margin: 0px 15px;
    border-radius: 100%;
    margin-right: 15px;
  }
  .call {
    width: 7rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    background-color: rgb(230, 248, 240);
    color: rgb(74, 155, 124);
    border-radius: 18px;
    margin-right: 45px;
    cursor: pointer;
  }
  .delFriend {
    color: white;
    margin-right: 25px;
    cursor: pointer;
  }
`;
export default MembersList;
