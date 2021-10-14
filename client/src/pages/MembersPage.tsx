import MembersList from "components/members/MembersList";
import MembersNav from "components/members/MembersNav";
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
  margin: 50px 0px 0px 25px;
`;

export default MembersPage;
