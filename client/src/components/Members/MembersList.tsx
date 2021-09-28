import React from "react";
import styled from "styled-components";

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
      <List>
        <div className="flex">
          <div>프로필사진</div>
          <div>이름</div>
        </div>

        <div>상태</div>
      </List>
      {/* {fakeDatas && 
      fakeDatas.map((data,index)=>(
          <div key={index}>
              {data.name}
          </div>
      ))
      
      } */}
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
  .flex {
    display: flex;
  }
`;
export default MembersList;
