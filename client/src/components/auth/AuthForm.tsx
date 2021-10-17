import Button from "components/common/Button";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LabelInput from "./LabelInput";
import { palette } from "lib/styles/palette";
import useAuth from "hooks/auth/useAuth";
import GoogleLogin from "react-google-login";
import useGoogleAuth from "hooks/auth/useGoogleAuth";
import { GOOGLE_CLIENT_ID } from "lib/config";

interface AuthFormProps {
  AuthType: "login" | "register";
}

const AuthForm = ({ AuthType }: AuthFormProps) => {
  const { form, onChange, onRegister, onLogin } = useAuth();
  const {
    onRegisterFailure,
    onRegisterSuccess,
    onLoginSuccess,
    onLoginFailure,
  } = useGoogleAuth();

  const { email, password, passwordConfirm, name } = form;
  return (
    <AuthFormBlock onSubmit={AuthType === "login" ? onLogin : onRegister}>
      <LabelInput
        label="이메일"
        name="email"
        value={email}
        type="email"
        placeholder="이메일을 입력해주세요"
        onChange={onChange}
      />

      <LabelInput
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={onChange}
      />

      {AuthType === "login" ? (
        <LoginUtil>
          <div></div>

          <div className="forgot-auth">
            <Link to="/">이메일/비밀번호 찾기</Link>
          </div>
        </LoginUtil>
      ) : (
        <>
          <LabelInput
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
          />

          <LabelInput
            label="이름"
            name="name"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={onChange}
          />
        </>
      )}

      {AuthType === "login" ? (
        <>
          <StyledButton color="true" type="submit">
            로그인
          </StyledButton>
          <hr />

          <GoogleButton
            clientId={GOOGLE_CLIENT_ID}
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
          >
            Google로 로그인
          </GoogleButton>
        </>
      ) : (
        <>
          <StyledButton color="true" type="submit">
            회원가입
          </StyledButton>
          <hr />
          <GoogleButton
            clientId={GOOGLE_CLIENT_ID}
            onSuccess={onRegisterSuccess}
            onFailure={onRegisterFailure}
          >
            Google로 회원가입
          </GoogleButton>
        </>
      )}
    </AuthFormBlock>
  );
};

const AuthFormBlock = styled.form``;

const LoginUtil = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 14px;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 45px;
  margin: 20px 0 8px;
`;

const GoogleButton = styled(GoogleLogin)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${palette.border} !important;
  border-radius: 4px !important;
  font-size: 16px !important;
  font-family: "Noto Sans KR", sans-serif !important;
`;

export default AuthForm;
