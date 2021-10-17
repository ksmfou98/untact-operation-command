import MembersList from "components/member/MembersList";
import MembersNav from "components/member/MembersNav";
import media from "lib/styles/media";
import React from "react";
import styled from "styled-components";

const MembersPage = () => {
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
