import Meet from "pages/Meet";
import React from "react";
import { Route } from "react-router";

const App = () => {
  return (
    <>
      <Route path="/meet/:roomId" component={Meet} />
    </>
  );
};

export default App;
