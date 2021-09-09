import React from "react";
import styled from "styled-components";

type IconCircleButtonProps = {
  backgroundColor?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function IconCircleButton({
  children,
  backgroundColor = "#37474f",
  className,
  ...rest
}: IconCircleButtonProps) {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      className={className}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ backgroundColor: string }>`
  background: ${(props) => props.backgroundColor};
  display: inline-flex;
  height: 48px;
  width: 48px;
  border: none;
  outline: none;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  & + button {
    margin-left: 16px;
  }
  svg {
    width: 24px;
    height: 24px;
  }
  &:hover {
    background: #455a64;
  }
`;

export default IconCircleButton;
