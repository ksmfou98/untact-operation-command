import MembersList from "components/Members/MembersList";
import MembersNav from "components/Members/MembersNav";
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
