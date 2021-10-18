import { userState } from "atoms/userState";
import AuthError from "components/auth/AuthError";
import MembersList from "components/member/MembersList";
import MembersNav from "components/member/MembersNav";
import media from "lib/styles/media";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const MembersPage = () => {
  const user = useRecoilValue(userState);
  if (!user._id) return <AuthError />;
  return (
    <MenberPageBlock>
      <MembersNav />
      <MembersList />
    </MenberPageBlock>
  );
};
const MenberPageBlock = styled.div`
  margin: 50px 150px 0px 25px;
  ${media.medium} {
    margin: 50px 40px 0px 25px;
  }
  ${media.small} {
    margin: 50px 0px 0px 0px;
  }
`;

export default MembersPage;
