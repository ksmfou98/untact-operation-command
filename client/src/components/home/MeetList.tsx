import { fakeData } from "fakeData";
import React from "react";
import styled from "styled-components";
import MeetListItem from "./MeetListItem";

const MeetList = () => {
  return (
    <MeetListBlock>
      <div className="meet-list">
        {fakeData.map((data, index) => (
          <MeetListItem data={data} key={index} />
        ))}
      </div>
    </MeetListBlock>
  );
};

const MeetListBlock = styled.div`
  flex: 1 1 0%;
  .meet-list {
    display: flex;
    flex-wrap: wrap;
  }
`;

export default MeetList;
