import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import MeetPage from "components/meet/Meet";
import MeetListPage from "pages/HomePage";
import Aside from "components/base/Aside";
import useChannelPluginEffect from "hooks/common/useChannelPluginEffect";
import styled from "styled-components";
import media from "lib/styles/media";
import CalendarPage from "pages/CalendarPage";
import RegisterPage from "pages/RegisterPage";
import LoginPage from "pages/LoginPage";
import MembersPage from "pages/MembersPage";
const App = () => {
  useChannelPluginEffect();
  return (
    <>
      <Switch>
        <Route path="/meet/:meetId" component={MeetPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />

        <AsideLayout>
          <Aside />
          <MainLayout>
            <PageTitle>
              <h1 className="left">비대면 작전 사령부</h1>
            </PageTitle>
            <Route path="/" exact component={MeetListPage} />
            <Route path="/schedule" exact component={CalendarPage} />
            <Route path="/members" exact component={MembersPage} />
          </MainLayout>
        </AsideLayout>
      </Switch>
    </>
  );
};

export default App;

const AsideLayout = styled.div`
  margin-left: 260px;
  ${media.xlarge} {
    margin-left: 90px;
  }
  ${media.small} {
    margin-left: 0;
  }
`;

const MainLayout = styled.div`
  /* padding: 35px 85px; */
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
`;

const PageTitle = styled.div`
  margin-bottom: 20px;
  .left {
    font-size: 22px;
    font-weight: 500;
  }
`;
