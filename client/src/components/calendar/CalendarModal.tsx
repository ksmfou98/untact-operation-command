import { scheduleState } from "atoms/calendarState";
import Modal from "components/common/Modal";
import useCalendarForm from "hooks/calendar/useCalendarForm";
import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCalendarEditEffect from "hooks/calendar/useCalendarEditEffect";

interface CalendarModalProps {
  onToggleModal: () => void;
  isModal: boolean;
  isEdit: boolean;
}

const CalendarModal = ({
  isModal,
  onToggleModal,
  isEdit,
}: CalendarModalProps) => {
  const {
    onChangeSchedule,
    onCreateSchedule,
    onChangeScheduleDate,
    onUpdateSchedule,
    onDeleteSchedule,
  } = useCalendarForm();

  const onToggle = () => {
    onToggleModal();
    resetSchedule();
  };

  const onDeleteAndToggle = (scheduleId: string) => {
    onToggleModal();
    onDeleteSchedule(scheduleId);
  };

  const resetSchedule = useResetRecoilState(scheduleState);
  const schedule = useRecoilValue(scheduleState);
  const { title, start, end, date, _id } = schedule;
  useCalendarEditEffect(_id);
  return (
    <div>
      {isModal ? (
        <Modal
          title={isEdit ? "일정 수정" : "일정 생성"}
          buttonName={isEdit ? "수정" : "생성"}
          onClick={() => {
            isEdit ? onUpdateSchedule() : onCreateSchedule();
          }}
          onToggleModal={onToggle}
          isModal={isModal}
          size="big"
        >
          <ModalStyled>
            {isEdit ? (
              <button
                className="deleteBtn"
                onClick={() => {
                  onDeleteAndToggle(_id);
                }}
              >
                삭제
              </button>
            ) : null}
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
              <MyDatePicker
                dateFormat="yyyy-MM-dd"
                selected={date}
                onChange={onChangeScheduleDate}
              />
            </div>
            <div className="infoEle">
              <div className="infoQutn"> 시간 </div>
              <div className="flex">
                <input
                  type="time"
                  className="infoInputShort"
                  name="start"
                  value={start}
                  onChange={onChangeSchedule}
                />
                ~
                <input
                  type="time"
                  className="infoInputShort"
                  name="end"
                  value={end}
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
  .deleteBtn {
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin: 20px 50px 0px 0px;
    width: 5rem;
    background-color: #0c1b2f;
    color: #ffffff;
    border-radius: 20px;
    float: right;
  }
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
      height: 3rem;
      text-align: center;
    }
    .infoInputShort {
      width: 180px;
      height: 3rem;
      text-align: center;
    }
  }
`;
const MyDatePicker = styled(DatePicker)`
  width: 90%;
  height: 3rem;
  border: 1px solid;
  text-align: center;
`;

export default CalendarModal;
