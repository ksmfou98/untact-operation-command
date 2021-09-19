import React from "react";
import styled from "styled-components";
import { IoPeopleOutline, IoEarthOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { BiBuilding } from "react-icons/bi";
import Button from "components/common/Button";

const HomeNav = () => {
  const navList = [
    {
      name: "전체",
      icon: <RiBarChartHorizontalLine size="30" />,
    },
    {
      name: "행사",
      icon: <IoPeopleOutline size="30" />,
    },
    {
      name: "강의",
      icon: <BsPencil size="30" />,
    },
    {
      name: "종교",
      icon: <BiBuilding size="30" />,
    },
    {
      name: "상담",
      icon: <IoEarthOutline size="30" />,
    },
  ];

  return (
    <HomeNavBlock>
      <div className="nav-list">
        <div className="left-box">
          {navList.map((item, index) => (
            <div className="item" key={index}>
              <div className="ico">{item.icon}</div>
              <div className="name">{item.name}</div>
            </div>
          ))}
        </div>
        <div className="right-box">
          <div>검색기능</div>
          <StyledButton color="true">회의 생성</StyledButton>
        </div>
      </div>
    </HomeNavBlock>
  );
};

const HomeNavBlock = styled.div`
  padding: 20px 0;
  .nav-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-box {
      display: flex;
      align-items: center;
      .item {
        display: flex;
        align-items: center;
        padding: 5px 30px 5px 5px;
        cursor: pointer;
        .ico {
          margin-right: 5px;
        }
      }
    }
    .right-box {
      display: flex;
      margin-right: 50px;
    }
  }
`;

const StyledButton = styled(Button)`
  width: 90px;
  height: 35px;
`;

export default HomeNav;
