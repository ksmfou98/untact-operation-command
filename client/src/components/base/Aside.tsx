import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

const Aside = () => {
  return <AsideBlock>asd</AsideBlock>;
};

const AsideBlock = styled.aside`
  position: fixed;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: ${palette.mainColor};
  box-shadow: 3px 14px 15px 1px rgba(90, 90, 90, 0.15);
  z-index: 2;
`;

export default Aside;
