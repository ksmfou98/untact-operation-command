import React from "react";
import styled from "styled-components";
import { BiHomeAlt, BiCalendar, BiHelpCircle } from "react-icons/bi";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const AsideMenu = () => {
  const asideMenus = [
    {
      name: "Home",
      link: "/",
      icon: <BiHomeAlt size="22" />,
    },
    {
      name: "Events",
      link: "/events",
      icon: <BiCalendar size="22" />,
    },
    {
      name: "Members",
      link: "/members",
      icon: <IoPeopleOutline size="22" />,
    },
  ];

  const activeStyle = {
    backgroundColor: "#f5f5f5",
    color: "#000",
  };
  return (
    <AsideMenuBlock>
      <div className="top-menu">
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
      </div>
      <div className="bottom-menu">
        <NavLink to="/setting">
          <div className="ico">
            <IoSettingsOutline />
          </div>
          <div className="name">Settings</div>
        </NavLink>
        <NavLink to="/help">
          <div className="ico">
            <BiHelpCircle />
          </div>
          <div className="name">Help Center</div>
        </NavLink>
      </div>
    </AsideMenuBlock>
  );
};

const AsideMenuBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  a {
    display: flex;
    align-items: center;
    padding: 10px 7px;
    border-radius: 10px;
    margin-bottom: 4px;
    color: #b1b1b1;
    &:hover {
      background-color: #f5f5f5;
      color: #000;
    }
    .ico {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    .name {
      font-size: 16px;
    }
  }
`;

export default AsideMenu;
