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
import { CalendarSkeleton } from "./CalendarSkeleton";

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
  const [showModal, setShowModal] = useState(false);
  const [modalEvents, setModalEvents] = useState<VideoEvent[]>([]);
  const [modalDate, setModalDate] = useState<Date | null>(null);
  const { listVideos, isLoading } = useContext(ScheduleContext);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleView = (newView: View) => {
    setView(newView);
  };

  const handleSelectEvent = (event: VideoEvent) => {
    window.open(`https://www.youtube.com/watch?v=${event.id}`, "_blank");
  };

  // Handler para o "+ X mais"
  const handleShowMore = (events: VideoEvent[], date: Date) => {
    setModalEvents(events);
    setModalDate(date);
    setShowModal(true);
  };

  // Função para formatar eventos com duração
  const formatEventsWithDuration = (videos: VideoEvent[]) => {
    return videos.map((video) => ({
      ...video,
      title: `${video.title} (${video.durationMinutes}min)`,
    }));
  };

  // Modal para mostrar todos os eventos do dia
  const EventsModal = () => {
    if (!showModal || !modalDate) return null;

    return (
      <div className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50  ">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto border-gray-300 border shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Eventos - {format(modalDate, "dd/MM/yyyy", { locale: ptBR })}
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            {modalEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelectEvent(event)}
              >
                <div className="font-medium text-sm mb-1">
                  {event.start && event.end && (
                    <span className="text-blue-600">
                      {format(event.start as Date, "HH:mm")} -{" "}
                      {format(event.end as Date, "HH:mm")}
                    </span>
                  )}
                </div>
                <div className="text-gray-800 text-sm">{event.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="card max-w-4xl">
        <div className="flex flex-row items-center justify-center text-xl sm:text-2xl font-bold mb-4">
          Video Schedule
        </div>

        {isLoading ? (
          <CalendarSkeleton />
        ) : (
          <div style={{ height: 500 }}>
            <Calendar
              localizer={localizer}
              events={formatEventsWithDuration(listVideos)}
              startAccessor="start"
              endAccessor="end"
              views={["month", "agenda"]}
              defaultView="month"
              view={view}
              date={date}
              onNavigate={handleNavigate}
              onView={handleView}
              onShowMore={handleShowMore} // Adicionar este handler
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
        )}
      </div>
      <EventsModal />
    </div>
  );
}
