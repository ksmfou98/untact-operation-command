import { PeopleIcon } from "assets/icons";
import styled from "styled-components";
import React from "react";

interface UsersButtonProps {
  usersCount: number;
  onClick: () => void;
}

function UsersButton({ usersCount, onClick }: UsersButtonProps) {
  return (
    <Button onClick={onClick}>
      <PeopleIcon />
      <span>{usersCount}</span>
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
    width: 24px;
    height: 24px;
  }
  span {
    padding: 4px;
    font-size: 14px;
    font-weight: bold;
    margin-left: 8px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.15);
    color: white;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export default UsersButton;
