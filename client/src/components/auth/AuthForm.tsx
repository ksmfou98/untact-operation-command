import React from "react";
import styled from "styled-components";

interface AuthFormProps {
  AuthType: "login" | "register";
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm = ({ AuthType, onSubmit }: AuthFormProps) => {
  return (
    <AuthFormBlock>
      <label>이메일</label>
      <input type="email" />

      <label>비밀번호</label>
      <input type="password" />

      {AuthType === "register" && (
        <>
          <label>비밀번호확인</label>
          <input type="password" />

          <label>이름</label>
          <input type="text" />
        </>
      )}

      {AuthType === "login" ? (
        <button>로그인</button>
      ) : (
        <button>회원가입</button>
      )}
    </AuthFormBlock>
  );
};

const AuthFormBlock = styled.div``;

export default AuthForm;
