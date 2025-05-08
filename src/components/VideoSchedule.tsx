import {
  Calendar,
  dateFnsLocalizer,
  Event as CalendarEvent,
  View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: ptBR }),
  getDay,
  locales,
});

// Tipagem do evento
interface VideoEvent extends CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

// Datas relativas ao mês atual em vez de datas fixas no futuro distante
const currentDate = new Date();
const events: VideoEvent[] = [
  {
    id: "75J0h_-nMvs",
    title: "Curso React - 30min",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ),
  },
  {
    id: "v-pJdP-AIw8",
    title: "YouTube API - 45min",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    ),
  },
];

export const VideoSchedule: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleView = (newView: View) => {
    setView(newView);
  };

  const handleSelectEvent = (event: VideoEvent) => {
    window.open(`https://www.youtube.com/watch?v=${event.id}`, "_blank");
  };

  return (
    <div className="card max-w-4xl">
      <div className="flex flex-row items-center justify-center text-xl sm:text-2xl font-bold mb-4">
        Video Schedule
      </div>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["month", "agenda"]}
          defaultView="month"
          view={view}
          date={date}
          onNavigate={handleNavigate}
          onView={handleView}
          culture="pt-BR"
          onSelectEvent={(event) => handleSelectEvent(event)}
          style={{ height: "100%" }}
          messages={{
            week: "Semana",
            day: "Dia",
            month: "Mês",
            today: "Hoje",
            previous: "Anterior",
            next: "Próximo",
            date: "Data",
            time: "Hora",
            event: "Evento",
            agenda: "Agenda",
            work_week: "Semana de trabalho",
            showMore: (total) => `+ ${total} mais`,
            noEventsInRange: "Não há eventos neste período",
          }}
        />
      </div>
    </div>
  );
};
