import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core/index.js';
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useStyleConfig } from '@chakra-ui/react';

export const Calendar = () => {
  const [events, setEvents] = useState([
    { id: '1', title: 'Event 1', date: '2024-09-01' },
    { id: '2', title: 'Event 2', date: '2024-09-05' },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const styles = useStyleConfig('Calendar', {});

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Enter event title');
    let calendarApi: CalendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      setEvents([...events, { id: String(events.length + 1), title, date: selectInfo.startStr }]);
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo.event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
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
    <Box sx={styles}>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView='dayGridMonth'
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEvent?.title}</ModalHeader>
          <ModalBody>
            <p><strong>Date:</strong> {selectedEvent?.start?.toISOString().split('T')[0]}</p>
            {/* Add more event details here */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
