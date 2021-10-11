import React from "react";
import { userState } from "atoms/userState";
import AuthError from "components/auth/AuthError";
import HomeNav from "components/home/HomeNav";
import MeetList from "components/home/MeetList";
import media from "lib/styles/media";
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
  margin-top: 20px;
  ${media.small} {
    margin-top: 0;
  }
`;

export default HomePage;
