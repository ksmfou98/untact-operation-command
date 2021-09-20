import HomeNav from "components/home/HomeNav";
import React from "react";
import styled from "styled-components";

const HomePage = () => {
  return (
    <HomePageBlock>
      <HomeNav />
    </HomePageBlock>
  );
};

const HomePageBlock = styled.div``;



export default HomePage;
