import { userState } from "atoms/userState";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import MobileSearchBar from "./MobileSearchBar";
import MobileSideMenu from "./MobileSideMenu";

interface MobileSideBarProps {
  isSideBar: boolean;
  onToggleSideBar: () => void;
}

const MobileSideBar = ({ isSideBar, onToggleSideBar }: MobileSideBarProps) => {
  const user = useRecoilValue(userState);

  return (
    <MobileSideBarBlock isSideBar={isSideBar} onMouseDown={onToggleSideBar}>
      <MobileSideBarInner
        isSideBar={isSideBar}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Title>
          <div className="user">
            {user._id ? (
              <>{user.name}</>
            ) : (
              <Link to="/login">로그인 하러 가기</Link>
            )}
          </div>
          <button className="close" onClick={onToggleSideBar}>
            <AiOutlineClose size="24" />
          </button>
        </Title>
        <MobileSearchBar />
        <MobileSideMenu />

        {user._id && (
          <AuthButton type="button">
            <div className="ico">
              <BiLogOut size="22" />
            </div>
            <div className="name">Logout</div>
          </AuthButton>
        )}
      </MobileSideBarInner>
      {isSideBar && <Background />}
    </MobileSideBarBlock>
  );
};

const MobileSideBarBlock = styled.div<{ isSideBar: boolean }>`
  position: fixed;
  width: ${(props) => (props.isSideBar ? "100%" : "0%")};
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const MobileSideBarInner = styled.div<{ isSideBar: boolean }>`
  position: absolute;
  padding: 10px;
  z-index: 9999;
  background-color: #fff;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${(props) => (props.isSideBar ? "60%" : "0%")};
  transition: 0.5s;
`;

const Title = styled.div`
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #afadad;
  display: flex;
  align-items: center;
  .user {
    font-size: 14px;
  }
  button {
    position: absolute;
    right: 7px;
    top: 13px;
  }
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 9998;
  left: 0;
  top: 0;
  opacity: 0.5;
`;

const AuthButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 7px;
  width: 100%;
  .ico {
    margin-right: 10px;
    display: flex;
    align-items: center;
    svg {
      color: #474747;
    }
  }
  .name {
    font-size: 14px;
  }
`;

export default MobileSideBar;
