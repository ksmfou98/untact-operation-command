import media from "lib/styles/media";
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
      <AuthWrapper>
        <Title>{AuthType === "login" ? "로그인" : "회원가입"}</Title>
        {AuthType === "login" ? (
          <StyledLink>
            <span>아직 회원이 아니신가요 ?</span>
            <Link to="/register">회원가입 하러가기</Link>
          </StyledLink>
        ) : (
          <StyledLink>
            <span>이미 회원이신가요?</span>
            <Link to="/login">로그인 하기</Link>
          </StyledLink>
        )}

        {children}

        <AuthFooter>
          <span>© untact-operation-command</span>
        </AuthFooter>
      </AuthWrapper>
    </AuthTemplateBlock>
  );
};

const AuthTemplateBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 15px;
  ${media.small} {
    height: auto;
  }
`;

const AuthWrapper = styled.div`
  width: 350px;
  ${media.small} {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  padding: 15px;
  color: #20303c;
  text-align: center;
  margin-bottom: 10px;
`;

const StyledLink = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  span {
    display: block;
    margin-right: 8px;
    color: #20303c;
  }
  a {
    color: #116dff;
    font-weight: 500;
  }
`;

const AuthFooter = styled.div`
  display: block;
  padding-top: 16px;
  font-style: normal;
  font-size: 15px;
  color: #949296;
  line-height: 22px;
  letter-spacing: 0;
  margin-bottom: 50px;
  text-align: center;
`;

export default AuthTemplate;
