import { Form } from "./components/Form/Form";
import { Header } from "./components/Header";
import { VideoSchedule } from "./components/VideoSchedule";
import { ScheduleProvider } from "./contexts/ScheduleProvider";

export default function App() {
  return (
    <div className="container">
      <Header />
      <ScheduleProvider>
        <Form />
        <VideoSchedule />
      </ScheduleProvider>
    </div>
  );
}
