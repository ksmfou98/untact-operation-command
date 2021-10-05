import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Image from "./Image";

interface ErrorScreenTemplateProps {
  errorText: string;
  buttonText: string;
  image: string;
  onButtonClick: () => void;
}

const ErrorScreenTemplate = ({
  errorText,
  buttonText,
  image,
  onButtonClick,
}: ErrorScreenTemplateProps) => {
  return (
    <ErrorScreenTemplateBlock>
      <ImageBlock>
        <Image size="big" text={errorText} img={image} />
      </ImageBlock>
      <StyledButton color="true" onClick={onButtonClick}>
        {buttonText}
      </StyledButton>
    </ErrorScreenTemplateBlock>
  );
};

const ErrorScreenTemplateBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  margin-bottom: 50px;
`;

const ImageBlock = styled.div`
  margin-bottom: 40px;
`;

const StyledButton = styled(Button)`
  width: 150px;
  height: 40px;
`;

export default ErrorScreenTemplate;
