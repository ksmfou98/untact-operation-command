import React from "react";
import styled from "styled-components";
import { IoPeopleOutline, IoEarthOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { BiBuilding } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "components/common/Button";
import media from "lib/styles/media";
import useModal from "hooks/common/useModal";
import MeetCreateModal from "./MeetCreateModal";

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

  const AllNavList = [
    {
      name: "전체",
      icon: <RiBarChartHorizontalLine size="22" />,
    },
  ].concat(HomeNavList);

  return (
    <HomeNavBlock>
      <div className="nav-list">
        <LeftBox>
          {AllNavList.map((item, index) => (
            <div className="item" key={index}>
              <div className="ico">{item.icon}</div>
              <div className="name">{item.name}</div>
            </div>
          ))}
        </LeftBox>
        <RightBox>
          <div className="search">
            <input type="text" placeholder="회의를 검색해주세요" />
            <button>
              <AiOutlineSearch size="22" />
            </button>
          </div>
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
    ${media.xsmall} {
    }
  }
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  ${media.xsmall} {
    flex: 1;
    justify-content: space-around;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 5px 30px 5px 5px;
    cursor: pointer;
    .ico {
      margin-right: 5px;
      color: #424242;
    }
    .name {
      font-size: 18px;
    }
    ${media.custom(980)} {
      padding-right: 10px;
      .ico {
        margin-right: 3px;
      }
      .name {
        font-size: 14px;
      }
    }
    ${media.xsmall} {
      flex-direction: column;
    }
  }
`;

const RightBox = styled.div`
  display: flex;
  .search {
    position: relative;
    margin-right: 20px;
    input {
      width: 242px;
      height: 36px;
      padding: 0 60px 0 14px;
      border: 1px solid #f7f7f6;
      border-radius: 18px;
      background-color: #f7f7f7;
      font-weight: 400;
      font-size: 12px;
      color: #666;
      line-height: 16px;
      outline: none;
      ${media.custom(980)} {
        width: 175px;
        height: 36px;
      }
    }
    button {
      position: absolute;
      right: 3px;
      top: 5px;
    }
  }
  ${media.small} {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  width: 90px;
  height: 35px;
`;

export default HomeNav;
