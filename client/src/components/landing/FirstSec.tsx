import { colorLogo } from "assets/image";
import media from "lib/styles/media";
import styled from "styled-components";
const FirstSec = () => {
  return (
    <FirstSecBlock>
      <Header>
        <a href="/">
          <img src={colorLogo} alt="logo" />
        </a>
        <div className="start">
          <a href="/">
            <div className="loginBtn">시작하기</div>
          </a>
        </div>
      </Header>

      <FirstDiv>
        <Video autoPlay muted>
          <source src="video/Bungee.mp4" type="video/mp4" />
        </Video>

        <H1Div>
          <H1>
            비대면작전사령부에서
            <br />더 생생하게
          </H1>
        </H1Div>
      </FirstDiv>
    </FirstSecBlock>
  );
};

const FirstSecBlock = styled.section`
  position: relative;
`;

const Header = styled.header`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 150px;
  img {
    height: 100%;
  }
  .start {
    float: right;
    width: 100px;
    .loginBtn {
      text-align: center;
      line-height: 1.75rem;
      background-color: #ffffff9d;
      border-radius: 15px;
      width: 5rem;
      height: 1.75rem;
      position: fixed;
      margin-top: 20px;
      margin-right: 20px;
    }
  }
  ${media.medium} {
    height: 100px;
  }
  ${media.small} {
    height: 50px;
  }
`;
const FirstDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const H1Div = styled.div`
  position: absolute;
`;

const H1 = styled.h1`
  font-size: 100px;
  font-weight: 700;
  line-height: 1.3;
  color: #f9fafb;
  text-align: center;
  ${media.medium} {
    font-size: 50px;
  }
  ${media.small} {
    font-size: 30px;
  }
`;

const Video = styled.video`
  width: 100vw;
  // height: 100vh;
`;

export default FirstSec;
