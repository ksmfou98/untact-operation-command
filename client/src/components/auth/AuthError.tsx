import { noLogin } from "assets/image";
import ErrorScreenTemplate from "components/common/ErrorScreenTemplate";
import React from "react";
import { useHistory } from "react-router";

const AuthError = () => {
  const history = useHistory();
  return (
    <ErrorScreenTemplate
      errorText="로그인 후 이용 가능합니다"
      buttonText="로그인 하러 가기"
      image={noLogin}
      onButtonClick={() => history.push("/login")}
    />
  );
};

export default AuthError;
