import { userState } from "atoms/userState";
import React from "react";
import { BiCalendar, BiHomeAlt } from "react-icons/bi";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const MobileSideMenu = () => {
  const asideMenus = [
    {
      name: "Home",
      link: "/",
      icon: <BiHomeAlt size="22" />,
    },
    {
      name: "Schedule",
      link: "/schedule",
      icon: <BiCalendar size="22" />,
    },
    {
      name: "Members",
      link: "/members",
      icon: <IoPeopleOutline size="22" />,
    },
  ];

  const activeStyle = {
    backgroundColor: "#e9e7e7",
    color: "#000",
  };
  const user = useRecoilValue(userState);
  return (
    <MobileSideMenuBlock>
      {asideMenus.map((asideMenu, index) => (
        <NavLink
          to={asideMenu.link}
          key={index}
          exact
          activeStyle={activeStyle}
        >
          <div className="ico">{asideMenu.icon}</div>
          <div className="name">{asideMenu.name}</div>
        </NavLink>
      ))}

      {user._id && (
        <NavLink to="/setting" exact activeStyle={activeStyle}>
          <div className="ico">
            <IoSettingsOutline size="22" />
          </div>
          <div className="name">Settings</div>
        </NavLink>
      )}
    </MobileSideMenuBlock>
  );
};

const MobileSideMenuBlock = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-top: 1px solid #afadad;
  border-bottom: 1px solid #afadad;
  a {
    display: flex;
    align-items: center;
    padding: 8px 7px;
    border-radius: 4px;
    margin-bottom: 4px;
    color: #000;
    &:hover {
      background-color: #f5f5f5;
      color: #000;
    }
    .ico {
      display: flex;
      align-items: center;
      margin-right: 10px;
      svg {
        color: #474747;
      }
    }
    .name {
      font-size: 14px;
    }
  }
`;

export default MobileSideMenu;
