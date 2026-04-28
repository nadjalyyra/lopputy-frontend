import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchTrainings } from "../api/trainingapi";
import "../App.css";

type TrainingEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

function CalendarPage() {
  const [events, setEvents] = useState<TrainingEvent[]>([]);

  useEffect(() => {
    fetchTrainings()
      .then((data) => {
        const trainingList = data._embedded?.trainings ?? [];

        const trainingPromises = trainingList.map((training: any) => {
          const customerLink = training._links?.customer?.href;

          if (!customerLink) {
            return Promise.resolve({
              training,
              customerName: "Tuntematon",
            });
          }

          return fetch(customerLink)
            .then((res) => res.json())
            .then((customerData) => ({
              training,
              customerName: `${customerData.firstname} ${customerData.lastname}`,
            }))
            .catch(() => ({
              training,
              customerName: "Tuntematon",
            }));
        });

        return Promise.all(trainingPromises);
      })
      .then((results: any[]) => {
        const calendarEvents: TrainingEvent[] = results.map((result) => {
          const { training, customerName } = result;

          const start = new Date(training.date);
          const end = new Date(
            new Date(training.date).getTime() + training.duration * 60000
          );

          return {
            id: training._links.self.href,
            title: `${training.activity} - ${customerName}`,
            start,
            end,
          };
        });

        setEvents(calendarEvents);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height="80vh"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventDisplay="block"
      />
    </div>
  );
}

export default CalendarPage;