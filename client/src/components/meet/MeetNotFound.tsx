import React from "react";
import { notExistMeet } from "assets/image";
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
