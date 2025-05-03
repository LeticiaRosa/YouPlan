import { useForm } from "react-hook-form";
import {
  InputMinutesPerDay,
  InputMinutesPerDayProps,
} from "./Input-minutes-per-day";
import { NumberOfVideos } from "./Number-of-videos";
import { week } from "./Mok-week";

type FormData = {
  [key: string]: string;
};

export function MinutesPerDay() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onHandleSubmit(data: FormData) {
    console.log(data);
  }
  return (
    <form className="card" onSubmit={handleSubmit(onHandleSubmit)}>
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
                id={id}
                key={abreviatedName}
                abreviatedName={abreviatedName}
                type={type}
                placeholder={placeholder}
                register={register}
              />
            )
          )}
        </div>
      </div>

      <div className="flex flex-row items-end justify-between gap-2 mt-4">
        <NumberOfVideos register={register} />
        <p className="error hidden">
          Informe por favor a quantidade de minutos nos dias da semana
        </p>
        <button type="submit" className="button text-base">
          Generate Schedule
        </button>
      </div>
    </form>
  );
}
