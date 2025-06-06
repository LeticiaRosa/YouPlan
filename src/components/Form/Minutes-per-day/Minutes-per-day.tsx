import { useFormContext, UseFormRegister } from "react-hook-form";
import { useContext } from "react";
import { ScheduleContext } from "../../../contexts/ScheduleContext";
import { week } from "../../../api/mock/week";
import {
  InputMinutesPerDay,
  InputMinutesPerDayProps,
} from "./Input-minutes-per-day";
import { NumberOfVideos } from "./Number-of-videos";
import { MinutesPerDayParams } from "../../../contexts/ScheduleProvider";
import { SearchForm } from "../schema";

export function MinutesPerDay() {
  const { setMinutesPerDay, termsSearch, executeGenerateSchedule } =
    useContext(ScheduleContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useFormContext<SearchForm>();

  function onHandleSubmit(data: SearchForm) {
    if (!termsSearch || termsSearch.length === 0) {
      setError("search" as keyof SearchForm, {
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
      setError("Mon" as keyof SearchForm, {
        type: "manual",
        message: "Informe por favor a quantidade de minutos nos dias da semana",
      });
      return;
    }

    const minutesPerDay: MinutesPerDayParams = {
      days: [
        { day: "Mon", minutes: data.Mon },
        { day: "Tue", minutes: data.Tue },
        { day: "Wed", minutes: data.Wed },
        { day: "Thu", minutes: data.Thu },
        { day: "Fri", minutes: data.Fri },
        { day: "Sat", minutes: data.Sat },
        { day: "Sun", minutes: data.Sun },
      ],
      qtdeVideos: data.qtdeVideos,
    };
    setMinutesPerDay(minutesPerDay);
    executeGenerateSchedule(minutesPerDay, termsSearch);
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
                register={register as UseFormRegister<SearchForm>}
                error={!!errors[name as keyof SearchForm]} // Passando informação de erro como boolean
              />
            )
          )}
        </div>
      </div>

      <div className="flex flex-row items-end justify-between gap-2 mt-4">
        <NumberOfVideos
          register={register as UseFormRegister<SearchForm>}
          error={!!errors["qtdeVideos"]}
        />
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
    </form>
  );
}
