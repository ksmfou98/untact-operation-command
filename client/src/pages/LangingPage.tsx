import styled, { keyframes } from "styled-components";
import FirstSec from "components/landing/FirstSec";

import { useEffect } from "react";
import ThirdSec from "components/landing/ThirdSec";

const LandingPage = () => {
  useEffect(() => {
    console.log(window.pageYOffset);
  }, [window.pageYOffset]);

  return (
    <LandingPageBlock>
      {/* 전반적인 소개 */}
      <FirstSec />
      {/* 디테일한 소개 */}
      {/* 화상회의 기능 소개 */}
      <ThirdSec />
      <main></main>
    </LandingPageBlock>
  );
};
const LandingPageBlock = styled.div``;

const SecondSec = styled.section`
  background-color: #f9fafb;
  .container {
    display: flex;
    flex-direction: row;
    height: 960px;
    margin: 250px 0 165px 0;
  }
`;

const SecondDiv = styled.div`
  overflow: hidden;
  top: 300px;
  right: calc(50% + 10px);
  width: 460px;
`;
const H2Div = styled.div`
  margin: 0px 85px 0 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const H2 = styled.h2`
  font-size: 50px;
  font-weight: 700;
  line-height: 1.4;
  color: #191f28;
`;

const SecondImg = styled.img`
  height: 100%;
  left: 57%;
`;
const SecondDivImg = styled.div`
  overflow: hidden;
`;

const P = styled.p`
  font-size: 23px;
  font-weight: 600;
  line-height: 1.5;
  color: rgb(51, 61, 75);
  transform: translate3d(0px, 50px, 0px);
  white-space: pre-wrap;
  //d
`;

export default LandingPage;
