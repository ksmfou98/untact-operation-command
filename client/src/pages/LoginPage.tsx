import AuthForm from "components/auth/AuthForm";
import AuthTemplate from "components/auth/AuthTemplate";
import React from "react";

const LoginPage = () => {
  return (
    <AuthTemplate AuthType="login">
      <AuthForm AuthType="login" />
    </AuthTemplate>
  );
};

export default LoginPage;
