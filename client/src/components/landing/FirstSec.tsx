import styled from "styled-components";

const FirstSec = () => {
  return (
    <FirstSecBlock>
      <Header>
        <button>로고</button>
        {/* <Logo>
                    <source src = 'logo.png'/>
                </Logo> */}
        <LoginBtn>login</LoginBtn>
      </Header>
      <FirstDiv>
        <Video autoPlay muted>
          <source src="Bungee.mp4" type="video/mp4" />
        </Video>

        <H1Div>
          <H1>
            {" "}
            비대면작전사령부에서
            <br />더 생생하게{" "}
          </H1>
          <button> 로그인 </button>
        </H1Div>
      </FirstDiv>
    </FirstSecBlock>
  );
};

const FirstSecBlock = styled.section`
  position: relative;
`;

const Header = styled.header`
  display: flex;
  position: absolute;
  justify-content: space-between;
  padding: 24px 48px;
  z-index: 1;
`;
const Logo = styled.image`
  position: fixed;
`;

const LoginBtn = styled.button`
  position: fixed;
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
`;

const Video = styled.video`
  width: 100vw;
  // height: 100vh;
`;

export default FirstSec;
