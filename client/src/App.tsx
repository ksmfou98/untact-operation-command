import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import MeetListPage from "pages/HomePage";
import Aside from "components/base/Aside";
import useChannelPluginEffect from "hooks/common/useChannelPluginEffect";
import styled from "styled-components";
import media from "lib/styles/media";
import CalendarPage from "pages/CalendarPage";
import RegisterPage from "pages/RegisterPage";
import LoginPage from "pages/LoginPage";
import MembersPage from "pages/MembersPage";
import MeetPage from "pages/MeetPage";
import SearchPage from "pages/SearchPage";
import MobileHeader from "components/base/MobileHeader";
import { useRecoilValue } from "recoil";
import { sideBarState } from "atoms/sideBarState";
const App = () => {
  useChannelPluginEffect();
  const sideBar = useRecoilValue(sideBarState);
  return (
    <>
      <Switch>
        <Route path="/meet/:meetId" component={MeetPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />

        <AsideLayout sideBar={sideBar}>
          <MobileHeader />
          <Aside />
          <MainLayout>
            <PageTitle>
              <h1 className="left">비대면 작전 사령부</h1>
            </PageTitle>
            <Route path="/" exact component={MeetListPage} />
            <Route path="/schedule" exact component={CalendarPage} />
            <Route path="/members" exact component={MembersPage} />
            <Route path="/search" component={SearchPage} />
          </MainLayout>
        </AsideLayout>
      </Switch>
    </>
  );
};

export default App;

const AsideLayout = styled.div<{ sideBar: boolean }>`
  margin-left: 260px;
  height: 100%;
  ${media.xlarge} {
    margin-left: 90px;
  }
  ${media.small} {
    margin-left: 0;
    padding-top: 50px;
  }
  ${(props) => props.sideBar && `overflow: hidden;`}
`;

const MainLayout = styled.div`
  /* padding: 35px 85px; */
  height: 100%;
  padding: 35px 0;
  width: 1760px;
  margin: 0 auto;
  ${media.xxlarge} {
    width: 1410px;
  }
  ${media.large} {
    width: 1060px;
  }
  ${media.medium} {
    width: calc(100% - 32px);
  }
  ${media.small} {
    padding: 0;
  }
`;

const PageTitle = styled.div`
  margin-bottom: 10px;
  .left {
    font-size: 22px;
    font-weight: 500;
  }
  ${media.small} {
    display: none;
  }
`;
