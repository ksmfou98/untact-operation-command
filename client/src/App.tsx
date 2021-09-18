import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import MeetPage from "pages/meet/MeetPage";
import MeetListPage from "pages/meet/HomePage";
import Aside from "components/base/Aside";
import useChannelPluginEffect from "hooks/useChannelPluginEffect";
import styled from "styled-components";
import media from "lib/styles/media";

const App = () => {
  useChannelPluginEffect();
  return (
    <>
      <Switch>
        <Route path="/meet/:roomId" component={MeetPage} />

        <AsideLayout>
          <Aside />
          <MainLayout>
            <PageTitle>
              <h1 className="left">비대면 작전 사령부</h1>
            </PageTitle>
            <Route path="/" exact component={MeetListPage} />
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
`;

const MainLayout = styled.div`
  padding: 20px;
`;

const PageTitle = styled.div`
  margin-bottom: 20px;
  .left {
    font-size: 22px;
    font-weight: 500;
  }
`;
