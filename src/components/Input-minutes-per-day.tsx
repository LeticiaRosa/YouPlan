import { UseFormRegister } from "react-hook-form";
import { schemaType } from "./Minutes-per-day";

export interface InputMinutesPerDayProps {
  id: number;
  name: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  type: string;
  placeholder: number;
  register: UseFormRegister<schemaType>;
  error?: boolean; // Adicionando propriedade de erro
}

export function InputMinutesPerDay({
  name,
  register,
  placeholder,
  error,
}: InputMinutesPerDayProps) {
  console.log("error", name, error);
  return (
    <input
      id={name}
      key={name}
      {...register(name, {
        valueAsNumber: true,
      })}
      type="number"
      placeholder={placeholder.toString()}
      className={`input  ${error ? "input-error" : ""}`}
    />
  );
}
