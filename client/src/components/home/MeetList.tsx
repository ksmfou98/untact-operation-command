import useMeetListEffect from "hooks/meet/useMeetListEffect";
import React from "react";
import styled from "styled-components";
import MeetListItem from "./MeetListItem";

const MeetList = () => {
  const { meets } = useMeetListEffect();
  return (
    <MeetListBlock>
      <div className="meet-list">
        {meets.map((meet, index) => (
          <MeetListItem meet={meet} key={index} />
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
