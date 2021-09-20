import React, { useState } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Modal from "components/common/Modal";
const CalendarPage = () => {
  const [isCreating, setisCreating] = useState(false);
  return (
    <CalendarPageBlock>
      <CalendarMain>
        <FullCalendar
          customButtons={{
            createSchedule: {
              text: "일정생성",
              click: function () {
                setisCreating(!isCreating);
              },
            },
          }}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today createSchedule",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          events={[
            { title: "event 1", date: "2021-09-10" },
            { title: "event 2", date: "2021-09-20" },
          ]}
        />
        {isCreating && (
          <Modal
            title="일정 생성"
            buttonName="생성"
            onClick={() => console.log("생성")}
            onToggleModal={() => setisCreating(!isCreating)}
            isModal={true}
            size="big"
            children="생성하겠습니까?"
          />
        )}
      </CalendarMain>
    </CalendarPageBlock>
  );
};

const CalendarPageBlock = styled.div`
  width: 100%;
`;

const CalendarMain = styled.main`
  .fc .fc-button-primary {
    background-color: rgb(59, 87, 231);
    border: none;
  }
  .fc .fc-button-primary:not(:disabled):active,
  .fc .fc-button-primary:not(:disabled).fc-button-active {
    background-color: rgb(0, 73, 176);
  }
`;

export default CalendarPage;
