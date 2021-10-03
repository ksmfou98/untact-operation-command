import React from "react";
import styled from "styled-components";
import { notExistMeet } from "assets/image";
import Image from "components/common/Image";
import Button from "components/common/Button";
import { useHistory } from "react-router";

const MeetNotFound = () => {
  const history = useHistory();
  return (
    <MeetNotFoundBlock>
      <ImageBlock>
        <Image size="big" text="회의가 존재하지 않습니다." img={notExistMeet} />
      </ImageBlock>
      <StyledButton color="true" onClick={() => history.push("/")}>
        홈으로 이동
      </StyledButton>
    </MeetNotFoundBlock>
  );
};

const MeetNotFoundBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  margin-bottom: 50px;
`;

const ImageBlock = styled.div`
  margin-bottom: 40px;
`;

const StyledButton = styled(Button)`
  width: 150px;
  height: 40px;
`;

export default MeetNotFound;
