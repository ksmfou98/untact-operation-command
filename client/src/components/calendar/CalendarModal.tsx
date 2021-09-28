import { scheduleState } from "atoms/calendarState";
import Modal from "components/common/Modal";
import useCalendarForm from "hooks/calendar/useCalendarForm";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface CalendarModalProps {
  onToggleModal: () => void;
  isModal: boolean;
}
const CalendarModal = ({ isModal, onToggleModal }: CalendarModalProps) => {
  const { onChangeSchedule, onCreateSchedule } = useCalendarForm();
  const schedule = useRecoilValue(scheduleState);
  const { title, start, end } = schedule;
  return (
    <div>
      {isModal ? (
        <Modal
          title="일정 생성"
          buttonName="생성"
          onClick={onCreateSchedule}
          onToggleModal={() => onToggleModal()}
          isModal={true}
          size="big"
        >
          <ModalStyled>
            <div className="infoEle">
              <div className="infoQutn">제목</div>
              <input
                type="text"
                className="infoInput"
                name="title"
                value={title}
                onChange={onChangeSchedule}
              />
            </div>
            <div className="infoEle">
              <div className="infoQutn"> 날짜 </div>
              <input type="date" className="infoInput" />
            </div>
            <div className="infoEle">
              <div className="infoQutn"> 시간 </div>
              <div className="flex">
                <input
                  type="time"
                  className="infoInputShort"
                  name="start"

                  onChange={onChangeSchedule}
                />
                ~
                <input
                  type="time"
                  className="infoInputShort"
                  name="end"
 
                  onChange={onChangeSchedule}
                />
              </div>
            </div>
          </ModalStyled>
        </Modal>
      ) : null}
    </div>
  );
};

const ModalStyled = styled.div`
  margin-left: 4.5%;
  .infoEle {
    margin: 30px 0px;
    .flex {
      display: flex;
      justify-content: space-between;
      width: 430px;
    }
    .infoQutn {
      font-size: 17px;
      padding: 15px 15px 9px 5px;
    }
    .infoInput {
      width: 90%;
      height: 40px;
    }
    .infoInputShort {
      width: 180px;
      height: 40px;
    }
  }
`;
export default CalendarModal;
