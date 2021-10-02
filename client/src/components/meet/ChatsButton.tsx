import { ChatsIcon } from "assets/icons";
import styled from "styled-components";
import React from "react";

interface ChatsButtonProps {
  onClick: () => void;
}

function ChatsButton({ onClick }: ChatsButtonProps) {
  return (
    <Button onClick={onClick}>
      <ChatsIcon />
    </Button>
  );
}

const Button = styled.button`
  border-radius: 8px;
  border: none;
  outline: none;
  background: transparent;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    color: white;
    width: 28px;
    height: 28px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export default ChatsButton;
