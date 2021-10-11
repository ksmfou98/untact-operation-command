import React from "react";
import styled from "styled-components";
import { IoPeopleOutline, IoEarthOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { BiBuilding } from "react-icons/bi";
import Button from "components/common/Button";
import media from "lib/styles/media";
import useModal from "hooks/common/useModal";
import MeetCreateModal from "./MeetCreateModal";
import { useRecoilState } from "recoil";
import { homeMenuState } from "atoms/homeMenuState";
import SearchBar from "./SearchBar";

export const HomeNavList = [
  {
    name: "행사",
    icon: <IoPeopleOutline size="22" />,
  },
  {
    name: "강의",
    icon: <BsPencil size="22" />,
  },
  {
    name: "종교",
    icon: <BiBuilding size="22" />,
  },
  {
    name: "상담",
    icon: <IoEarthOutline size="22" />,
  },
];

const HomeNav = () => {
  const { isModal, onToggleModal } = useModal();
  const [isMenu, setIsMenu] = useRecoilState(homeMenuState);

  const onChangeMenu = (name: string) => {
    setIsMenu(name);
  };

  return (
    <HomeNavBlock>
      <div className="nav-list">
        <LeftBox>
          <div
            className={`item ${isMenu === "전체" ? "menu-active" : ""}`}
            onClick={() => onChangeMenu("전체")}
          >
            <div className="ico">
              <RiBarChartHorizontalLine size="22" />
            </div>
            <div className="name">전체</div>
          </div>

          {HomeNavList.map((item, index) => (
            <div
              className={`item ${isMenu === item.name ? "menu-active" : ""}`}
              onClick={() => onChangeMenu(item.name)}
              key={index}
            >
              <div className="ico">{item.icon}</div>
              <div className="name">{item.name}</div>
            </div>
          ))}
        </LeftBox>
        <RightBox>
          <SearchBar />
          <StyledButton onClick={onToggleModal} color="true">
            회의 생성
          </StyledButton>
        </RightBox>
      </div>
      {isModal && (
        <MeetCreateModal isModal={isModal} onToggleModal={onToggleModal} />
      )}
    </HomeNavBlock>
  );
};

const HomeNavBlock = styled.div`
  padding: 20px 0;
  .nav-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  .item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
    margin-right: 8px;
    &:hover {
      background-color: #f5f5f5;
      border-radius: 10px;
    }
    .ico {
      margin-right: 5px;
      color: #424242;
    }
    .name {
      font-size: 18px;
    }
    ${media.custom(1050)} {
      padding: 10px;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      .ico {
        margin-right: 0;
        margin-bottom: 4px;
      }
      .name {
        font-size: 14px;
      }
    }
  }

  .menu-active {
    background-color: #f5f5f5;
    border-radius: 10px;
  }
`;

const RightBox = styled.div`
  display: flex;
  ${media.small} {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  width: 90px;
  height: 35px;
`;

export default HomeNav;
