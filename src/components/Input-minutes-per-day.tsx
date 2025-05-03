export interface InputMinutesPerDayProps {
  id: number;
  abreviatedName: string;
  type: string;
  placeholder: string;
  register: any;
}

export function InputMinutesPerDay({
  id,
  abreviatedName,
  type,
  placeholder,
  register,
}: InputMinutesPerDayProps) {
  return (
    <input
      id={id.toString()}
      name={abreviatedName}
      key={abreviatedName}
      {...register(abreviatedName)}
      type={type}
      placeholder={placeholder}
      className="input input-minutes-per-day"
      min="0"
      max="1440"
      step="1"
    />
  );
}
