import React from "react";
import styled from "styled-components";
import { notExistMeet } from "assets/image";
import Image from "components/common/Image";
import Button from "components/common/Button";
import { useHistory } from "react-router";
import ErrorScreenTemplate from "components/common/ErrorScreenTemplate";

const MeetNotFound = () => {
  const history = useHistory();
  return (
    <ErrorScreenTemplate
      errorText="회의가 존재하지 않습니다"
      buttonText="홈으로 이동"
      image={notExistMeet}
      onButtonClick={() => history.push("/")}
    />
  );
};

export default MeetNotFound;
