import React from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import media from "lib/styles/media";
import CalendarModal from "components/calendar/CalendarModal";
import useCalendarEffect from "hooks/calendar/useCalendarEffect";
import Loading from "components/common/Loading";
import useHandleCalendar from "hooks/calendar/useHandleCalendar";

const CalendarPage = () => {
  const {
    schedules,
    isModal,
    onToggleModal,
    isEdit,
    onEditToggleModal,
    loading,
  } = useCalendarEffect();

  const { onEventClick } = useHandleCalendar(onEditToggleModal);

  if (loading) return <Loading />;
  return (
    <CalendarPageBlock>
      <Calendar>
        <FullCalendar
          timeZone="UTC"
          aspectRatio={1.75}
          customButtons={{
            createSchedule: {
              text: "일정생성",
              click: function () {
                onToggleModal();
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
          events={schedules}
          eventClick={onEventClick}
        />
      </Calendar>
      <CalendarModal
        isModal={isModal}
        onToggleModal={onToggleModal}
        isEdit={isEdit}
        onEditToggleModal={onEditToggleModal}
      />
    </CalendarPageBlock>
  );
};

const CalendarPageBlock = styled.div`
  width: 90%;
`;

const Calendar = styled.div`
  .fc {
    --fc-event-bg-color: #3788d8;
    --fc-event-border-color: #3788d8;
    --fc-event-text-color: #fff;
    --fc-event-selected-overlay-color: rgba(0, 0, 0, 0.25);
    .fc-daygrid-event {
      z-index: 6;
      color: #777dce;
      border: solid 1px #777dce;
      background-color: rgb(194, 204, 255);
      margin-top: 1px;
    }
    .fc-col-header-cell-cushion {
      /* needs to be same precedence */
      padding-top: 6px; /* an override! */
      padding-bottom: 5px; /* an override! */
    }
    .fc-button-primary {
      background-color: rgb(59, 87, 231);
      border: none;
    }
    .fc-button-primary:not(:disabled):active,
    .fc-button-primary:not(:disabled).fc-button-active {
      background-color: rgb(0, 73, 176);
    }
  }

  ${media.medium} {
    .fc {
      .fc-button {
        font-size: 11px;
      }
    }
  }
  ${media.small} {
    .fc-toolbar-title {
      font-size: 13px;
    }
  }
`;

export default CalendarPage;

//#777dce
//rgb(194,204,255)
