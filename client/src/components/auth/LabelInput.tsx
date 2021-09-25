import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

type LabelInputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const LabelInput = ({ label, ...rest }: LabelInputProps) => {
  return (
    <LabelInputBlock>
      <label>{label}</label>
      <input {...rest} />
    </LabelInputBlock>
  );
};

const LabelInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    font-size: 14px;
    color: #20303c;
    margin-bottom: 8px;
    padding-left: 4px;
  }
  input {
    border: none;
    border-bottom: 1px solid #e1e1e1;
    outline: none;
    padding: 8px;
    &:focus {
      border-bottom: 1px solid ${palette.mainColor};
    }
  }
`;

export default LabelInput;
