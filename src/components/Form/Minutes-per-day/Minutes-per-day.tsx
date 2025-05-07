import { useFormContext, UseFormRegister } from "react-hook-form";
import { useContext } from "react";
import { ScheduleContext } from "../../../contexts/ScheduleContext";
import { week } from "../../../api/mock/week";
import {
  InputMinutesPerDay,
  InputMinutesPerDayProps,
} from "./Input-minutes-per-day";
import { NumberOfVideos } from "./Number-of-videos";
import { searchVideos } from "../../../api/services/videoService";

type MinutesPerDayType = {
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
  Sat: number;
  Sun: number;
  qtdeVideos: number;
};

export function MinutesPerDay() {
  const { setMinutesPerDay, termsSearch } = useContext(ScheduleContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useFormContext<MinutesPerDayType>();

  function onHandleSubmit(data: MinutesPerDayType) {
    if (!termsSearch) {
      setError("search" as keyof MinutesPerDayType, {
        type: "manual",
        message: "Informe por favor os termos de busca no campo Search",
      });
      return;
    }
    if (
      data.Mon === 0 &&
      data.Tue === 0 &&
      data.Wed === 0 &&
      data.Thu === 0 &&
      data.Fri === 0 &&
      data.Sat === 0 &&
      data.Sun === 0
    ) {
      setError("Mon", {
        type: "manual",
        message: "Informe por favor a quantidade de minutos nos dias da semana",
      });
      return;
    }
    console.log("data", data);
    setMinutesPerDay(data);

    const videos = searchVideos(termsSearch);
    console.log("videos", videos);
  }

  return (
    <form className="card" onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="flex flex-col gap-2">
        <h1 className="text-md font-bold">Minutes per day</h1>
        <div className="grid grid-cols-7 gap-2 text-center text-gray-5min">
          {week.map(({ id, name }: InputMinutesPerDayProps) => (
            <p key={`label-${id}`}>{name}</p>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 place-content-center">
          {week.map(
            ({ id, name, type, placeholder }: InputMinutesPerDayProps) => (
              <InputMinutesPerDay
                id={id}
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                register={register as UseFormRegister<MinutesPerDayType>}
                error={!!errors[name]} // Passando informação de erro como boolean
              />
            )
          )}
        </div>
      </div>

      <div className="flex flex-row items-end justify-between gap-2 mt-4">
        <NumberOfVideos
          register={register as UseFormRegister<MinutesPerDayType>}
          error={!!errors["qtdeVideos"]}
        />
        <div className="flex flex-row items-end justify-between gap-2 mt-4">
          <p className="error">
            {errors.Mon?.message ||
              errors.Tue?.message ||
              errors.Wed?.message ||
              errors.Thu?.message ||
              errors.Fri?.message ||
              errors.Sat?.message ||
              errors.Sun?.message ||
              errors.qtdeVideos?.message}
          </p>
          <button type="submit" className="button text-base">
            Generate Schedule
          </button>
        </div>
      </div>
    </form>
  );
}
