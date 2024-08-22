import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core/index.js';

export const Calendar = () => {
  const [events, setEvents] = useState([
    { id: '1', title: 'Event 1', date: '2024-09-01' },
    { id: '2', title: 'Event 2', date: '2024-09-05' },
  ]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Enter event title');
    let calendarApi: CalendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      setEvents([...events, { id: String(events.length + 1), title, date: selectInfo.startStr }]);
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  };

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView='dayGridMonth'
      selectable={true}
      select={handleDateSelect}
      events={events}
      eventContent={renderEventContent}
      eventClick={handleEventClick}
    />
  );
};
