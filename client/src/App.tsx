import Meet from "pages/MeetPage";
import React from "react";
import { Route } from "react-router";
import "./App.css";

const App = () => {
  return (
    <>
      <Route path="/meet/:roomId" component={Meet} />
    </>
  );
};

export default App;
