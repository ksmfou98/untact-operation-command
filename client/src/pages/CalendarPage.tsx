import React from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarPage = () => {
  return (
    <CalendarPageBlock>
      <CalendarMain>
        <FullCalendar
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        />
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
    border : none;
  }
  .fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active{
    background-color: rgb(0, 73, 176);
  }
`;

export default CalendarPage;
