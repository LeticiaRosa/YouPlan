import {
  InputMinutesPerDay,
  InputMinutesPerDayProps,
} from "./Input-minutes-per-day";
import { NumberOfVideos } from "./Number-of-videos";

export function MinutesPerDay() {
  const week = [
    {
      id: 1,
      abreviatedName: "Mon",
      type: "number",
      placeholder: "0",
    },
    {
      id: 2,
      abreviatedName: "Tue",
      type: "number",
      placeholder: "0",
    },
    {
      id: 3,
      abreviatedName: "Wed",
      type: "number",
      placeholder: "0",
    },
    {
      id: 4,
      abreviatedName: "Thu",
      type: "number",
      placeholder: "0",
    },
    {
      id: 5,
      abreviatedName: "Fri",
      type: "number",
      placeholder: "0",
    },
    {
      id: 6,
      abreviatedName: "Sat",
      type: "number",
      placeholder: "0",
    },
    {
      id: 7,
      abreviatedName: "Sun",
      type: "number",
      placeholder: "0",
    },
  ] as InputMinutesPerDayProps[];

  return (
    <div className="card">
      <div className="flex flex-col gap-2">
        <h1 className="text-md font-bold">Minutes per day</h1>
        <div className="grid grid-cols-7 gap-2 text-center text-gray-5min">
          {week.map(({ id, abreviatedName }: InputMinutesPerDayProps) => (
            <p key={`label-${id}`}>{abreviatedName}</p>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 place-content-center">
          {week.map(
            ({
              id,
              abreviatedName,
              type,
              placeholder,
            }: InputMinutesPerDayProps) => (
              <InputMinutesPerDay
                key={id}
                id={id}
                abreviatedName={abreviatedName}
                type={type}
                placeholder={placeholder}
              />
            )
          )}
        </div>
      </div>
      <NumberOfVideos />
    </div>
  );
}
