import { useForm, UseFormRegister } from "react-hook-form";
import {
  InputMinutesPerDay,
  InputMinutesPerDayProps,
} from "./Input-minutes-per-day";
import { NumberOfVideos } from "./Number-of-videos";
import { week } from "./Mok-week";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  Mon: z
    .number({
      message: "Informe por favor a quantidade de minutos nos dias da semana",
    })
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440)
    .nullable(),
  Tue: z
    .number()
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440)
    .nullable(),
  Wed: z
    .number()
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440)
    .nullable(),
  Thu: z
    .number()
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440)
    .nullable(),
  Fri: z
    .number()
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440)
    .nullable(),
  Sat: z
    .number()
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440)
    .nullable(),
  Sun: z
    .number()
    .min(0, "Informe por favor a quantidade de minutos nos dias da semana")
    .max(1440)
    .nullable(),
  qtdeVideos: z
    .number()
    .min(1, "Informe por favor a quantidade de vídeos")
    .max(100, "Informe por favor a quantidade de vídeos entre 1 e 100"),
});

export type schemaType = z.infer<typeof schema>;

export function MinutesPerDay() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<schemaType>({
    defaultValues: {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
      qtdeVideos: 0,
    },
    resolver: zodResolver(schema),
  });

  function onHandleSubmit(data: schemaType) {
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
                register={register as UseFormRegister<schemaType>}
                error={!!errors[name]} // Passando informação de erro como boolean
              />
            )
          )}
        </div>
      </div>

      <div className="flex flex-row items-end justify-between gap-2 mt-4">
        <NumberOfVideos
          register={register as UseFormRegister<schemaType>}
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
