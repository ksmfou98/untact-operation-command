import { meetsState } from "atoms/meetState";
import Loading from "components/common/Loading";
import useMeetListEffect from "hooks/meet/useMeetListEffect";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import MeetListItem from "./MeetListItem";

const MeetList = () => {
  const meets = useRecoilValue(meetsState);
  useMeetListEffect();
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
