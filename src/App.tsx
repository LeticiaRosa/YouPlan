import { Form } from "./components/Form/Form";
import { Header } from "./components/Header";
import { Summary } from "./components/Summary";
import { VideoSchedule } from "./components/VideoSchedule";
import { ScheduleProvider } from "./contexts/ScheduleProvider";

export default function App() {
  return (
    <div className="container">
      <Header />
      <ScheduleProvider>
        <Form />
        <Summary totaldays={4} />
        <VideoSchedule />
      </ScheduleProvider>
    </div>
  );
}
