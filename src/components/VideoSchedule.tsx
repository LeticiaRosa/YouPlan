import {
  Calendar,
  dateFnsLocalizer,
  Event as CalendarEvent,
  View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useContext, useState } from "react";
import { ScheduleContext } from "../contexts/ScheduleContext";

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
export interface VideoEvent extends CalendarEvent {
  id: string;
  description?: string;
  dayName: string;
  thumbnailUrl?: string;
  durationMinutes: number;
}

export function VideoSchedule() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");
  const { listVideos } = useContext(ScheduleContext);

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
          events={listVideos}
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
}
