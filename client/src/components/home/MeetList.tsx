import { noMeetingGoingOn } from "assets/image";
import { meetsState } from "atoms/meetState";
import Image from "components/common/Image";
import Loading from "components/common/Loading";
import useMeetListEffect from "hooks/meet/useMeetListEffect";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import MeetListItem from "./MeetListItem";

const MeetList = () => {
  const meets = useRecoilValue(meetsState);
  const { loading } = useMeetListEffect();

  if (loading) return <Loading />;

  if (meets.length === 0)
    return (
      <NoMeetingBlock>
        <Image
          img={noMeetingGoingOn}
          text="진행 중인 회의가 없습니다!"
          size="big"
        />
      </NoMeetingBlock>
    );

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

const NoMeetingBlock = styled.div`
  width: 100%;
  height: 100%;
`;

export default MeetList;
