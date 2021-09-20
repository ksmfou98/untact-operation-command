import HomeNav from "components/home/HomeNav";
import MeetList from "components/home/MeetList";
import React from "react";
import styled from "styled-components";

const HomePage = () => {
  return (
    <HomePageBlock>
      <HomeNav />
      <HomeMain>
        <MeetList />
      </HomeMain>
    </HomePageBlock>
  );
};

const HomePageBlock = styled.div``;

const HomeMain = styled.main`
  display: flex;
  margin-top: 32px;
`;

export default HomePage;
