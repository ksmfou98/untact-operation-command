import styled from "styled-components";
import loadingICON from "assets/icons/loading.webp";

const Loading = () => {
  return (
    <LoadingBlock>
      <div className="loading-show"></div>
    </LoadingBlock>
  );
};

const LoadingBlock = styled.div`
  position: fixed;
  z-index: 9998;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  .loading-show {
    position: fixed;
    z-index: 10000;
    top: 50%;
    left: 50%;
    margin: -16px 0 0 -16px;
    width: 32px;
    height: 32px;
    background: url(${loadingICON}) no-repeat 50% 50%;
    background-size: 16px 16px;
  }
`;

export default Loading;
