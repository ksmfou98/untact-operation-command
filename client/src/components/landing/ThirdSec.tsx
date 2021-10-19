import styled from "styled-components";
import transitions from "lib/styles/transitions";
import media from "lib/styles/media";
import { remoteMeeting } from "assets/image";

const ThirdSec = () => {
  return (
    <ThirdSecBlock>
      <h1>
        비작사와 <br />
        함께
      </h1>
      <FirstExplanation>
        <img src={remoteMeeting} />
        <div>
          <h2>군내의</h2>
          <h3>행사, 종교, 강의, 상담, 업무까지 한번에</h3>
        </div>
        <p>
          전 세계적으로 코로나 팬데믹상황이 지속되면서 <br />
          모든 것을 온라인으로 진행하는 사회가 되었습니다 <br />
          이에 따라 군 내에서도 비대면의 필요성이 대두되었고 <br />
          비대면작전사령부에서는 이에대한 해결책을 제시합니다.
        </p>
      </FirstExplanation>

      <SecondExplanation>
        <div className="left">
          <img src={remoteMeeting}></img>
          <div>
            <h2>rtars</h2>
            <h3>arasraas</h3>
          </div>
        </div>
        <div className="right">
          <img src={remoteMeeting}></img>
          <p>asdsadasdasfasfasfafsfafasfas</p>
        </div>
      </SecondExplanation>
      <ThirdExplanation>
        <img src={remoteMeeting}></img>
        <div>
          <div>
            <h2>가나다람다만</h2>
            <h3>가나다라마바</h3>
          </div>
          <p>기나더미패드미저기미거므지래푸</p>
        </div>
      </ThirdExplanation>
    </ThirdSecBlock>
  );
};

const H1 = styled.h1`
  animation: ${transitions.fadeIn} 2s linear infinite;
`;

const ThirdSecBlock = styled.section`
  padding: 250px 0;
  margin: 0 auto;
  position: relative;
  width: 100%;
  overflow: hidden;
  max-width: 1140px;
  h1 {
    margin-bottom: 140px;
    font-size: 60px;
    font-weight: 700;
    line-height: 1.4;
    color: #191f28;
  }
  ${media.medium} {
    padding: 110px 0;
    h1 {
      font-size: 35px;
      margin-left: 20px;
    }
  }
`;

const FirstExplanation = styled.section`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin-bottom: 210px;
  img {
    flex-shrink: 0;
    width: 100%;
    max-width: 740px;
    margin: 0 auto;
    margin-bottom: 60px;
    animation: ${transitions.fadeIn} 2.5s;
  }
  div {
    display: flex;
    margin-bottom: 24px;
    animation: ${transitions.fadeIn} 2.5s;
    h2 {
      font-size: 40px;
      font-weight: 700;
      line-height: 1.3;
      color: #191f28;
      margin-right: 12px;
    }
    h3 {
      font-size: 40px;
      font-weight: 700;
      line-height: 1.3;
      color: #191f28;
      color: #b0b8c1;
    }
  }
  p {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    color: #333d4b;
    animation: ${transitions.fadeIn} 2.5s;
  }
  ${media.medium} {
    div {
      display: inline-block;
      h2 {
        font-size: 30px;
      }
      h3 {
        font-size: 25px;
      }
      p {
        font-size: 12px;
        font-weight: 600;
        line-height: 1.5;
        color: #333d4b;
        animation: ${transitions.fadeIn} 2.5s;
      }
    }
  }
`;

const SecondExplanation = styled.section`
  display: flex;
  width: 100%;
  margin-bottom: 220px;
  animation: ${transitions.fadeIn} 2.5s;
  .left {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    flex: 2;
    margin-right: 40px;
    img {
      flex-shrink: 0;
      width: 100%;
      margin-bottom: 40px;
    }
    div {
      h2 {
        font-size: 40px;
        font-weight: 700;
        line-height: 1.3;
        color: #191f28;
        margin-bottom: 5px;
      }
      h3 {
        font-size: 40px;
        font-weight: 700;
        line-height: 1.3;
        color: #b0b8c1;
      }
    }
  }
  .right {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    flex: 1;
    margin-top: 122px;
    img {
      flex-shrink: 0;
      width: 100%;
      margin-bottom: 35px;
    }
    p {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.5;
      color: #333d4b;
      width: 100%;
    }
  }
  ${media.medium} {
  }
`;

const ThirdExplanation = styled.section`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  animation: ${transitions.fadeIn} 2.5s;
  img {
    width: 100%;
    flex-shrink: 0;
    margin-bottom: 50px;
  }
  div {
    display: flex;
    width: 100%;
    div {
      flex: 1;
      margin-bottom: 0px;
      h2 {
        font-size: 40px;
        font-weight: 700;
        line-height: 1.3;
        color: #191f28;
        margin-bottom: 5px;
      }
      h3 {
        font-size: 40px;
        font-weight: 700;
        line-height: 1.3;
        color: #b0b8c1;
      }
    }
    p {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.5;
      color: #333d4b;
      flex: 1;
    }
    div {
      display: flex;
    }
  }
`;
export default ThirdSec;
