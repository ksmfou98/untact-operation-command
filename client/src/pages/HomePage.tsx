import { userState } from "atoms/userState";
import AuthError from "components/auth/AuthError";
import HomeNav from "components/home/HomeNav";
import MeetList from "components/home/MeetList";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const HomePage = () => {
  const user = useRecoilValue(userState);
  if (!user._id) return <AuthError />;

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
