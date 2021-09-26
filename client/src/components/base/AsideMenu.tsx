import React from "react";
import styled from "styled-components";
import { BiHomeAlt, BiCalendar } from "react-icons/bi";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import media from "lib/styles/media";
import useAuth from "hooks/auth/useAuth";
import { useRecoilValue } from "recoil";
import { userState } from "atoms/userState";

const AsideMenu = () => {
  const { onLogout } = useAuth();
  const user = useRecoilValue(userState);

  const asideMenus = [
    {
      name: "Home",
      link: "/",
      icon: <BiHomeAlt size="30" />,
    },
    {
      name: "Schedule",
      link: "/schedule",
      icon: <BiCalendar size="30" />,
    },
    {
      name: "Members",
      link: "/members",
      icon: <IoPeopleOutline size="30" />,
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
        <NavLink to="/setting" exact activeStyle={activeStyle}>
          <div className="ico">
            <IoSettingsOutline size="30" />
          </div>
          <div className="name">Settings</div>
        </NavLink>
        {user?.name && (
          <button className="logout" type="button" onClick={onLogout}>
            <div className="ico">
              <FiLogOut size="30" />
            </div>
            <div className="name">Logout</div>
          </button>
        )}
      </div>
    </AsideMenuBlock>
  );
};

const AsideMenuBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  a,
  .logout {
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
      font-size: 18px;
    }
    ${media.xlarge} {
      flex-direction: column;
      .ico {
        margin-right: 0;
      }
      .name {
        font-size: 12px;
      }
    }
  }

  .logout {
    width: 100%;
  }
`;

export default AsideMenu;
