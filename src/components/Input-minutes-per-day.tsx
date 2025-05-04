import { UseFormRegister } from "react-hook-form";

export type MinutesFormData = {
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
  Sat: number;
  Sun: number;
  [key: string]: number | undefined;
};

export interface InputMinutesPerDayProps {
  id: number;
  abreviatedName: string;
  type: string;
  placeholder: number;
  register: UseFormRegister<MinutesFormData>;
}

export function InputMinutesPerDay({
  id,
  abreviatedName,
  type,
  register,
}: InputMinutesPerDayProps) {
  return (
    <input
      id={id.toString()}
      key={abreviatedName}
      {...register(abreviatedName)}
      type={type}
      className="input input-minutes-per-day"
      min="0"
      max="1440"
      step="1"
    />
  );
}
