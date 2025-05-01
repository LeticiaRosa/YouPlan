import { Header } from "./components/Header";
import { MinutesPerDay } from "./components/Minutes-per-day";
import { Search } from "./components/Search";
import { Summary } from "./components/Summary";
import { VideoSchedule } from "./components/VideoSchedule";

export default function App() {
  return (
    <div className="container">
      <Header />
      <Search />
      <MinutesPerDay />
      <Summary totaldays={4} />
      <VideoSchedule />
    </div>
  );
}
