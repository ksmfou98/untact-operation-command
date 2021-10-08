import Modal from "components/common/Modal";
import useMemberSearchEffect from "hooks/member/useMemberSearchEffect";
import React from "react";
import styled from "styled-components";

interface MemberSearchModalProps {
  onToggleModal: () => void;
  isModal: boolean;
}

const MemberSearchModal = ({
  isModal,
  onToggleModal,
}: MemberSearchModalProps) => {
  return (
    <div>
      <Modal
        title="친구 추가"
        buttonName="추가"
        onClick={() => {}}
        onToggleModal={onToggleModal}
        isModal={isModal}
        size="big"
      >
        <MenberSearchModalMain>
          <div className="searchBox">
            <div>이메일 검색</div>
            <input className="searchInput" type="text" />
            <div className="searchBtn">검색</div>
          </div>
          <SearchListBox>
            <SearchList>asd</SearchList>
          </SearchListBox>
        </MenberSearchModalMain>
      </Modal>
    </div>
  );
};
const MenberSearchModalMain = styled.main`
  .searchBox {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    .searchInput {
      height: 30px;
      margin-left: 20px;
      width: 22rem;
    }
    .searchBtn {
      height: 25px;
      line-height: 25px;
      text-align: center;
      margin-left: 5px;
      width: 2.5rem;
      background-color: #0c1b2f;
      color: #ffffff;
      border-radius: 5px;
    }
  }
`;
const SearchListBox = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  border: #d5d3d3 1px solid;
`;
const SearchList = styled.div`
  height: 50px;
  border-bottom: 1px solid #d5d3d3;
  display: flex;
  align-items: center;
`;

export default MemberSearchModal;
