import Button from "components/common/Button";
import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import LabelInput from "./LabelInput";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { palette } from "lib/styles/palette";
import useAuth from "hooks/auth/useAuth";

interface AuthFormProps {
  AuthType: "login" | "register";
}

const AuthForm = ({ AuthType }: AuthFormProps) => {
  const { form, onChange, onRegister } = useAuth();

  const { email, password, passwordConfirm, name } = form;
  return (
    <AuthFormBlock onSubmit={AuthType === "login" ? onRegister : onRegister}>
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
          <div className="remember-option">
            <input type="checkbox" />
            <span>자동 로그인</span>
          </div>

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
          <StyledButton color="true">로그인</StyledButton>
          <hr />
          <SocialButton socialType="google" color="false">
            <FcGoogle size="24" />
            <span>Google로 로그인</span>
            <div></div>
          </SocialButton>

          <SocialButton socialType="kakao" color="false">
            <RiKakaoTalkFill size="24" />
            <span>카카오계정으로 로그인</span>
            <div></div>
          </SocialButton>
        </>
      ) : (
        <>
          <StyledButton color="true" type="submit">
            회원가입
          </StyledButton>
          <hr />
          <SocialButton socialType="google" color="false">
            <FcGoogle size="24" />
            <span>Google로 회원가입</span>
            <div></div>
          </SocialButton>
          <SocialButton socialType="kakao" color="false">
            <RiKakaoTalkFill size="24" />
            <span>카카오계정으로 회원가입</span>
            <div></div>
          </SocialButton>
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

const SocialButton = styled(Button)<{ socialType: "kakao" | "google" }>`
  display: flex;
  width: 100%;
  height: 45px;
  padding: 10px;
  margin-top: 15px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${palette.border};
  color: rgba(0, 0, 0, 0.85);
  div {
    width: 24px;
  }
  &:hover {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.85);
  }

  ${(props) =>
    props.socialType === "kakao" &&
    css`
      background-color: #fee500;
      border: none;
      svg {
        color: #000;
      }
      &:hover {
        background-color: #fee500;
      }
    `}
`;

export default AuthForm;
