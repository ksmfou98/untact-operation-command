import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import MeetPage from "pages/meet/MeetPage";
import MeetListPage from "pages/meet/MeetListPage";
import Aside from "components/base/Aside";
import { AsideWrapper } from "GlobalStyles";

const App = () => {
  return (
    <Switch>
      <Route path="/meet/:roomId" component={MeetPage} />

      <AsideWrapper>
        <Aside />
        <Route path="/channels" exact component={MeetListPage} />
      </AsideWrapper>
    </Switch>
  );
};

export default App;
