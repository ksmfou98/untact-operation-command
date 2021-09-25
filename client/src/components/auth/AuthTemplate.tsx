import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface AuthTemplateProps {
  children: React.ReactNode;
  AuthType: "login" | "register";
}

const AuthTemplate = ({ children, AuthType }: AuthTemplateProps) => {
  return (
    <AuthTemplateBlock>
      <h1>{AuthType === "login" ? "로그인" : "회원가입"}</h1>
      {AuthType === "login" ? (
        <>
          <span>아직 회원이 아니신가요 ?</span>
          <Link to="/register">회원가입</Link>
        </>
      ) : (
        <>
          <span>이미 회원이신가요?</span>
          <Link to="/login">로그인</Link>
        </>
      )}

      {children}
    </AuthTemplateBlock>
  );
};

const AuthTemplateBlock = styled.div``;

export default AuthTemplate;
