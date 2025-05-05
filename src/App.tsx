import { Header } from "./components/Header";
import { MinutesPerDay } from "./components/Minutes-per-day";
import { Search } from "./components/Search";
import { Summary } from "./components/Summary";
import { VideoSchedule } from "./components/VideoSchedule";
import { ScheduleProvider } from "./contexts/ScheduleProvider";

export default function App() {
  return (
    <div className="container">
      <Header />
      <ScheduleProvider>
        <Search />
        <MinutesPerDay />
        <Summary totaldays={4} />
        <VideoSchedule />
      </ScheduleProvider>
    </div>
  );
}
