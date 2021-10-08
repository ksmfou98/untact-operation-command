import { noMeetingGoingOn } from "assets/image";
import { homeMenuState } from "atoms/homeMenuState";
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
  const homeMenu = useRecoilValue(homeMenuState);
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
          //<> </>로 감싸면 key를 못주는데 Fragment는 가능
          <React.Fragment key={index}>
            {homeMenu === "전체" ? (
              <MeetListItem meet={meet} />
            ) : (
              homeMenu === meet.menu && <MeetListItem meet={meet} />
            )}
          </React.Fragment>
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
