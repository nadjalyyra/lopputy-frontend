import { useEffect, useState, useCallback } from "react";
import { Calendar, momentLocalizer, type View } from "react-big-calendar";
import moment from "moment";
import { fetchTrainings } from "../api/trainingapi";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

moment.locale("fi-FI");

type TrainingEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

function CalendarPage() {
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [view, setView] = useState<View>("week");

  const handleViewChange = useCallback((newView: View) => {
    setView(newView);
  }, []);

  useEffect(() => {
    fetchTrainings()
      .then((data) => {
        const trainingList = data._embedded?.trainings ?? [];
        
        // Asiakkaan nimen hakeminen
        const trainingPromises = trainingList.map((training: any) => {
          const customerLink = training._links?.customer?.href;
          if (!customerLink) {
            return Promise.resolve({ training, customerName: "Tuntematon" });
          }
          
          return fetch(customerLink)
            .then(res => res.json())
            .then(customerData => ({
              training,
              customerName: `${customerData.firstname} ${customerData.lastname}`
            }))
            .catch(() => ({ training, customerName: "Tuntematon" }));
        });
        
        return Promise.all(trainingPromises);
      })
      .then((results: any[]) => {
        const calendarEvents: TrainingEvent[] = results.map((result) => {
          const { training, customerName } = result;
          
          console.log("Raw date from API:", training.date);
          
          const start = moment(training.date).toDate();
          const end = moment(start).add(training.duration, "minutes").toDate();
          
          console.log("Parsed start:", start, "Parsed end:", end);
          
          return {
            id: training._links.self.href,
            title: `${training.activity} - ${customerName}`,
            start,
            end
          };
        });
        
        console.log("All events:", calendarEvents);
        setEvents(calendarEvents);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ height: 600, padding: 20 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={view}
        onView={handleViewChange}
        views={["day", "week", "month"]}
        defaultView="week"
        culture="fi-FI"
        messages={{
          today: "Tänään",
          previous: "<",
          next: ">",
          month: "Kuukausi",
          week: "Viikko",
          day: "Päivä",
          agenda: "Agenda"
        }}
      />
    </div>
  );
}

export default CalendarPage;