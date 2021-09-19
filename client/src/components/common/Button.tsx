import { palette } from "lib/styles/palette";
import React from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  color: "true" | "false";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, color, ...rest }: ButtonProps) => {
  return (
    <StyledButton color={color} {...rest}>
      {children}
    </StyledButton>
  );
};

export const commonButtonStyle = css<{ color: "true" | "false" }>`
  border-radius: 5px;
  font-weight: 700;
  font-size: 14px;
  ${(props) =>
    props.color === "true"
      ? css`
          background-color: ${palette.mainColor};
          color: #fff;
          border: none;
          &:hover {
            background-color: ${palette.mainColorHover};
          }
        `
      : css`
          border: 1px solid ${palette.mainColor};
          color: ${palette.mainColor};
          &:hover {
            background-color: ${palette.mainColor};
            color: #fff;
          }
        `}
`;

const StyledButton = styled.button`
  ${commonButtonStyle}
`;

export default Button;
