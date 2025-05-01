import { Header } from "./components/Header";
import { MinutesPerDay } from "./components/Minutes-per-day";
import { Search } from "./components/Search";

export default function App() {
  return (
    <div className="container ">
      <Header />
      <Search />
      <MinutesPerDay />
    </div>
  );
}
