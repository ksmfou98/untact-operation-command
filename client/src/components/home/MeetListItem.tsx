import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BsFillPeopleFill } from "react-icons/bs";
import media from "lib/styles/media";
import { IMeetState } from "atoms/meetState";
import { SERVER_URL } from "lib/config";
import useModal from "hooks/common/useModal";
import PasswordModal from "./PasswordModal";

interface MeetListItemProps {
  meet: IMeetState;
}

const MeetListItem = ({ meet }: MeetListItemProps) => {
  const { _id, title, description, host, thumbnail, password } = meet;
  const history = useHistory();
  const { isModal, onToggleModal } = useModal();

  const onEnterMeet = () => {
    if (password) {
      onToggleModal();
    } else {
      history.push(`/meet/${_id}`);
    }
  };

  return (
    <MeetListItemBlock>
      <MeetThumbnail onClick={onEnterMeet}>
        <div className="thumbnail">
          <img src={`${SERVER_URL}/${thumbnail}`} alt="" />
        </div>
      </MeetThumbnail>
      <MeetContent>
        <button onClick={onEnterMeet}>
          <h4>{title}</h4>
          <div className="description-wrapper">
            <p>{description}</p>
          </div>
        </button>
      </MeetContent>
      <MeetInfo>
        <div className="userinfo">
          <img src="https://picsum.photos/600/300" alt="" />
          <span>
            by &nbsp;
            <b>{host.name}</b>
          </span>
        </div>
        <div className="members">
          <BsFillPeopleFill size="15" /> 3
        </div>
      </MeetInfo>
      {isModal && (
        <PasswordModal isModal={isModal} onToggleModal={onToggleModal} />
      )}
    </MeetListItemBlock>
  );
};

const MeetListItemBlock = styled.div`
  width: 320px;
  background: white;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${media.medium} {
    width: calc(50% - 32px);
  }
  ${media.small} {
    width: 100%;
    margin-bottom: 5px;
  }
`;

const MeetThumbnail = styled.button`
  display: block;
  color: inherit;
  text-decoration: none;
  .thumbnail {
    width: 100%;
    position: relative;
    padding-top: 52.19206680584551%;
    img {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
`;

const MeetContent = styled.div`
  padding: 16px;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  button {
    display: block;
    color: inherit;
    text-decoration: none;
    text-align: left;
    h4 {
      font-size: 16px;
      margin: 0px 0px 0.25rem;
      line-height: 1.5;
      word-break: break-word;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: rgb(33, 37, 41);
    }
    .description-wrapper {
      flex: 1 1 0%;
      p {
        margin: 0px 0px 24px;
        word-break: break-word;
        overflow-wrap: break-word;
        font-size: 14px;
        line-height: 1.5;
        height: 63px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgb(73, 80, 87);
      }
    }
  }
`;

const MeetInfo = styled.div`
  padding: 10px 16px;
  border-top: 1px solid rgb(248, 249, 250);
  display: flex;
  font-size: 12px;
  line-height: 1.5;
  -webkit-box-pack: justify;
  justify-content: space-between;
  .userinfo {
    text-decoration: none;
    color: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    img {
      object-fit: cover;
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      display: block;
      margin-right: 0.5rem;
    }
    span {
      color: rgb(134, 142, 150);
      b {
        color: rgb(52, 58, 64);
      }
    }
  }
  .members {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    svg {
      margin-right: 6px;
    }
  }
`;

export default MeetListItem;
