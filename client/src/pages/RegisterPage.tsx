import AuthForm from "components/auth/AuthForm";
import AuthTemplate from "components/auth/AuthTemplate";
import React from "react";

const RegisterPage = () => {
  return (
    <AuthTemplate AuthType="register">
      <AuthForm AuthType="register" />
    </AuthTemplate>
  );
};

export default RegisterPage;
